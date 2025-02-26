"use client";

import Button from "~/components/widgets/Button";
import { FormHeader } from "../../FormHeader";
import { FormFooter } from "../../FormFooter";
import { Container } from "./styles";
import ToggleSwitch from "~/components/widgets/ToggleSwitch";
import { TableData } from "./MirrorTablePresenter";
import { Budget } from "~/components/widgets/Budget";
import { type TasksInfosType } from "~/server/types/Clickup.type";
import { useRouter, useSearchParams } from "next/navigation";
import { SkeletonContainer } from "~/components/forms/FormSelectInput/InputsDataContainer/styles";
import { Skeleton } from "~/components/widgets/Skeleton";
import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";
import { useAtom } from "jotai";
import { MonthlyForecastTable } from "~/components/widgets/MonthlyForecastTable";
import { useTasksOfProject } from "~/hooks/useTasksOfProject";
import { showToast } from "~/utils/functions/showToast";
import { api } from "~/trpc/react";
import { projectSelectedValuePropAtom } from "~/@atom/ProjectStates/projectSelectedValue";

type BudgetInfo = {
  totalDays: number;
  totalHours: number;
  totalValue: string | number;
};
type MirrorTableProps = {
  budgetInfo: BudgetInfo;
  tasksCustomFields: TasksInfosType;
};
export function MirrorTableContainer({
  budgetInfo,
  tasksCustomFields,
}: MirrorTableProps) {
  const [checked] = useAtom(checkedAtom);
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const router = useRouter();
  const { getTasksInfos } = useTasksOfProject();
  const createTask = api.task.createTask.useMutation();
  const roles = getTasksInfos();
  const [projectSelectedValue] = useAtom(projectSelectedValuePropAtom);

  const projectName = projectSelectedValue.selectedValue["projectRow-text"] || "Sem projeto";
  
  async function HandleRedirectToPages(page: string) {
    try {
      if (!roles) {
        showToast("error", "Erro", "Nenhuma tarefa encontrada");
        return;
      }

      await Promise.all(
        roles.map(async (role) => {
          const hours = Array.isArray(role.hours) ? 0 : role.hours;
          const valueByHour = Array.isArray(role.valueByHour)
            ? 0
            : role.valueByHour;

          await createTask.mutateAsync({
            taskId: role.taskId,
            projectName: projectName,
            name: role.fieldName,
            role: role.chargeName,
            hours,
            valueByHour,
            startDate: role.taskStartDate,
            endDate: role.taskDueDate,
            estimatedValue: hours * valueByHour,
            estimatedHours: hours,
            absences: [],
          });
        })
      );
      router.push(`/${page}?projectId=${projectId}`);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Container>
      <ToggleSwitch />
      <FormHeader />
      {!!tasksCustomFields ? (
        <TableData tasksCustomFields={tasksCustomFields} />
      ) : (
        <div>
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonContainer key={index}>
              <Skeleton
                style={{ borderRadius: "60px" }}
                width="95%"
                height="1.25rem"
              />
            </SkeletonContainer>
          ))}
        </div>
      )}
      <FormFooter>
        <Budget budgetInfo={budgetInfo} />
        {checked ? (
          <MonthlyForecastTable />
        ) : (
          <>
            <Button
              text="Alterar projeto"
              type="button"
              onClick={() => HandleRedirectToPages("projeto")}
            />
            <Button
              text="Definir pessoas"
              type="button"
              onClick={() => HandleRedirectToPages("pessoas")}
            />
          </>
        )}
      </FormFooter>
    </Container>
  );
}
