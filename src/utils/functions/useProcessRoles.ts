import { useGetInputValueAtIndex } from "./getInputValueAtIndex";
import { api } from "~/trpc/react";
import { type Tasks as Task } from "@prisma/client";

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
    if (!tasks) return [];

    return tasks
      .map((task: Task) => {
        const taskAbsences =
          absences?.filter((absence) => absence.taskId === task.id) || [];

        return taskAbsences.map((absence) => {
          const workedHours = task.hours - absence.absences;
          const estimatedValue = task.valueByHour * task.hours;
          const realValue = task.valueByHour * workedHours;

          return {
            Projeto: task.projectName,
            Pessoa: task.name,
            Cargo: task.role,
            "Mês Referência": absence.month,
            Ano: absence.year,
            Ausências: absence.absences,
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
