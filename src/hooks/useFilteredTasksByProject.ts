import { useSession } from "@clerk/nextjs";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { projectOptionsAtom } from "~/@atom/ProjectStates/projectOptions";
import { EndPointClickUpApiEnum } from "~/clickUpApi/EndPointClickUpApiEnum";
import { type CustomField, type OptionType } from "~/server/types/Clickup.type";
import { api } from "~/trpc/react";
import { showToast } from "~/utils/functions/showToast";

export function useFilteredTasksByProject() {
  const router = useRouter();
  const { session } = useSession();
  const userId = session?.user.id;
  const [, setProjectOptions] = useAtom(projectOptionsAtom);

  const getTasks = api.clickup.getTasks.useQuery({
    endPoint: EndPointClickUpApiEnum.enum.task,
    userId: userId ?? "",
  });

  const getCustomField = api.clickup.getCustomFields.useQuery({
    endPoint: EndPointClickUpApiEnum.enum.field,
    userId: userId ?? "",
  });

  const filteredTasksByProject = useMemo(() => {
    const customFieldData = getCustomField.data ?? [];
    const tasksData = getTasks.data ?? [];

    if (!getCustomField.isFetched || !Array.isArray(customFieldData)) {
      return [];
    }

    const projectCustomField = customFieldData.find(
      (field: CustomField) => field.name === "PixelCraft_projeto"
    );

    if (!projectCustomField) {
      return [];
    }

    const projectOptionsResp = projectCustomField.type_config.options || [];
    setProjectOptions(projectOptionsResp);
    const projectsWithTasks = projectOptionsResp.filter((project: OptionType) =>
      tasksData.some((task) =>
        task.custom_fields.some(
          (field) =>
            Array.isArray(field.value) && field.value.includes(project.id)
        )
      )
    );

    return projectsWithTasks.map((project) => {
      const tasksOfProject = tasksData.filter((task) =>
        task.custom_fields.some((field) => {
          if (Array.isArray(field.value)) {
            return field.value.includes(project.id);
          }
          return false;
        })
      );

      const dates = tasksOfProject.reduce(
        (acc, task) => {
          const startDate = task.start_date ? parseInt(task.start_date) : null;
          const endDate = task.due_date ? parseInt(task.due_date) : null;

          if (
            startDate &&
            (!acc.minStartDate || startDate < acc.minStartDate)
          ) {
            acc.minStartDate = startDate;
          }
          if (endDate && (!acc.maxEndDate || endDate > acc.maxEndDate)) {
            acc.maxEndDate = endDate;
          }

          return acc;
        },
        {
          minStartDate: null as number | null,
          maxEndDate: null as number | null,
        }
      );

      return { project, tasks: tasksOfProject, dates };
    });
  }, [
    getCustomField.data,
    getCustomField.isFetched,
    getTasks.data,
    setProjectOptions,
  ]);

  useEffect(() => {
    if (getCustomField.error) {
      showToast(
        "error",
        "Erro ao buscar custom fields!",
        "Configura se PK e ListId estão cadastrados corretamente."
      );
    }
  }, [router, getCustomField.error]);

  return {
    filteredTasksByProject,
    isLoading: getCustomField.isLoading || getTasks.isLoading,
    isError: getCustomField.error || getTasks.error,
  };
}
