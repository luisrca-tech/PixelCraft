import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { TextButton } from "~/components/widgets/TextButton";
import { ButtonsContainer } from "./styles";
import { BsFiletypePdf } from "react-icons/bs";
import { useAtom } from "jotai";
import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";
import { useExportToExcel } from "~/utils/functions/exportToExcel";
import { api } from "~/trpc/react";
import { showToast } from "~/utils/functions/showToast";
import { useState } from "react";
import { useTasksOfProject } from "~/hooks/useTasksOfProject";

export const ExportButtons = () => {
  const [checked] = useAtom(checkedAtom);
  const exportExcel = useExportToExcel();
  const [isLoading, setIsLoading] = useState(false);
  const createTask = api.task.createTask.useMutation();
  const { getTasksInfos } = useTasksOfProject();

  const handleExport = async () => {
    try {
      setIsLoading(true);
      const roles = getTasksInfos();

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

      exportExcel();
      showToast("success", "Sucesso", "Dados salvos e exportados com sucesso");
    } catch (error) {
      console.error("Error saving tasks:", error);
      if (error instanceof Error) {
        showToast("error", "Erro", error.message);
      } else {
        showToast("error", "Erro", "Erro ao salvar os dados");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!checked && (
        <ButtonsContainer>
          <TextButton
            text="Xslx"
            action={handleExport}
            icon={<PiMicrosoftExcelLogoFill size={24} />}
            loading={isLoading}
          />
          <TextButton
            text="Pdf"
            icon={<BsFiletypePdf size={24} />}
            disabled
          />
        </ButtonsContainer>
      )}
    </>
  );
};
