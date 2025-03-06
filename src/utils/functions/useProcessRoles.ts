import { useGetInputValueAtIndex } from "./getInputValueAtIndex";
import { api } from "~/trpc/react";
import { type Tasks as Task } from "@prisma/client";
import { getMonthsForTask } from "./getMonthsForTask";

export function useProcessRoles() {
  const projectHeaderInputValue = useGetInputValueAtIndex(
    undefined,
    "projectRow",
    true
  );

  const { data: tasks } = api.task.getTasksByProjectName.useQuery({
    projectName: projectHeaderInputValue || "",
  });

  const { data: absences } = api.absences.getAbsencesByProjectName.useQuery({
    projectName: projectHeaderInputValue || "",
  });

  const processRoles = () => {
    if (!tasks || !absences) return [];

    return tasks
      .map((task: Task) => {
        const months = getMonthsForTask(task);

        return months.map((monthYear) => {
          const [month, year] = monthYear.split("-");
          const yearNumber = year ? parseInt(year) : 0;


          const absenceForMonth = absences.find(
            (absence) =>
              absence.taskId === task.id &&
              absence.month.toString().padStart(2, "0") === month &&
              absence.year === yearNumber
          );

          const absencesCount = absenceForMonth?.absences ?? 0;
          const workedHours = task.hours - absencesCount;
          const estimatedValue = task.valueByHour * task.hours;
          const realValue = task.valueByHour * workedHours;

          return {
            Projeto: task.projectName,
            Pessoa: task.name,
            Cargo: task.role,
            "Mês Referência": month,
            Ano: yearNumber,
            Ausências: absencesCount,
            "Horas Planejadas": task.hours,
            "Horas Trabalhadas": workedHours,
            "Valor/Hora": task.valueByHour,
            "Valor Previsto": estimatedValue,
            "Valor Real": realValue,
          };
        });
      })
      .flat();
  };

  const processedRolesData = processRoles();

  return processedRolesData;
}