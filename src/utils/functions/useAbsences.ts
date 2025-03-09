import { useMemo } from "react";
import { api } from "~/trpc/react";
import { type TaskInfo } from "~/server/types/Clickup.type";
import { type AbsencesData } from "~/types/absenses-input-type";
import { useGetInputValueAtIndex } from "~/utils/functions/getInputValueAtIndex";

export const useAbsences = (task: TaskInfo, reset: (data: AbsencesData) => void) => {
    const projectHeaderInputValue = useGetInputValueAtIndex(
        undefined,
        "projectRow",
        true
    );

    const {
        data: absences,
        isLoading: absencesIsLoading,
        isFetched: absencesIsFetched,
        refetch,
    } = api.absences.getAbsencesByProjectName.useQuery({
        projectName: projectHeaderInputValue || "",
    });

    const formattedAbsences = useMemo(() => {
        if (absencesIsFetched && absences) {
            const formattedData = {
                absencesForTask: task.months.map((month) => {
                    const year = month.split("-")[1] || "0";
                    const yearNumber = parseInt(year);

                    const absenceForMonth = absences.find(
                        (absence) =>
                            absence.taskId === task.taskId &&
                            absence.month.toString().padStart(2, "0") ===
                            month.split("-")[0] &&
                            absence.year === yearNumber
                    );

                    return {
                        taskId: task.taskId,
                        month: month,
                        absences: absenceForMonth?.absences?.toString() || "0",
                    };
                }),
            };

            reset(formattedData);

            return formattedData;
        }
        return null;
    }, [absencesIsFetched, absences, task.months, task.taskId, reset]);

    return {
        absences: formattedAbsences,
        isLoading: absencesIsLoading,
        isFetched: absencesIsFetched,
        refetch,
    };
};