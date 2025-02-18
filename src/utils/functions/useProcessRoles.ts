import { useTasksOfProject } from "~/hooks/useTasksOfProject";
import { useGetInputValueAtIndex } from "./getInputValueAtIndex";
import { type TaskInfo } from "~/server/types/Clickup.type";

export function useProcessRoles() {
    const projectHeaderInputValue = useGetInputValueAtIndex(
        undefined,
        "projectRow",
        true,
    );

    const { getTasksInfos } = useTasksOfProject();
    const roles = getTasksInfos();

    const absences: { [key: string]: number } = {
        "12-2024": 2,
        "01-2025": 4,
        "02-2025": 3,
        "03-2025": 1,
    };

    const processRoles = (
        roles: TaskInfo[],
        absences: { [key: string]: number }
    ) => {
        return roles
            .map((role) => {
                const hours = Array.isArray(role.hours) ? 0 : role.hours;
                const valueByHour = Array.isArray(role.valueByHour)
                    ? 0
                    : role.valueByHour;

                return role.months.map((month) => {
                    const absence = absences[month] || 0;
                    const workedHours = hours - absence;
                    const estimatedValue = valueByHour * hours;
                    const realValue = valueByHour * workedHours;

                    return {
                        Projeto: projectHeaderInputValue,
                        Pessoa: role.fieldName,
                        Cargo: role.chargeName,
                        "Mês Referência": month,
                        Ausências: absence,
                        "Horas Planejadas": hours,
                        "Horas Trabalhadas": workedHours,
                        "Valor/Hora": valueByHour,
                        "Valor Previsto": estimatedValue,
                        "Valor Real": realValue,
                    };
                });
            })
            .flat();
    };

    const processedRolesData = roles ? processRoles(roles, absences) : [];

    return processedRolesData
}