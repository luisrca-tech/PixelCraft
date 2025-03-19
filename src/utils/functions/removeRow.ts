import { rowsAndSelectedValuesAtom } from "~/@atom/ProjectStates/rowsAndSelectedValuesAtom";
import { useAtom } from "jotai";
import { api } from "~/trpc/react";
import { useSearchParams } from "next/navigation";
import { showToast } from "./showToast";

export const useRemoveRow = () => {
    const [rowsAndSelectedValues, setRowsAndSelectedValues] = useAtom(rowsAndSelectedValuesAtom);
    const mutationDeleteTask = api.clickup.deleteTask.useMutation();
    const searchParams = useSearchParams();
    const projectId = searchParams.get("projectId");

    const removeRow = async (rowIndex: string, userId?: string) => {
        const taskId = rowsAndSelectedValues.selectedValues[`taskId${rowIndex}`];
        if (!!projectId) {

            const deleteTask = await mutationDeleteTask.mutateAsync({
                taskId: taskId,
                userId: userId ?? "",
            });

            if (deleteTask.sucess) {
                setRowsAndSelectedValues((prevState) => {
                    const removedRows = prevState.rows.filter((row) => row !== rowIndex);
                    const updatedSelectedValues = { ...prevState.selectedValues };

                    Object.keys(updatedSelectedValues).forEach((key) => {
                        if (
                            key.includes(`firstTextValue${rowIndex}`) ||
                            key.includes(`secondTextValue${rowIndex}`) ||
                            key.includes(`thirdTextValue${rowIndex}`)
                        ) {
                            delete updatedSelectedValues[key];
                        }
                    });


                    if (removedRows.length === 1) {
                        window.location.href = "/projetos"
                    }

                    return {
                        rows: removedRows,
                        selectedValues: updatedSelectedValues,
                    };
                });
            }

            const toastMessages = {
                auth: "Erro de autorização ao excluir tarefa.",
                generic: "Erro desconhecido.",
            };

            if (deleteTask.authError) {
                showToast("error", toastMessages.auth)
            }
            if (deleteTask.genericalError) {
                showToast("error", toastMessages.generic)
            }

        }
    };

    return { removeRow };
}; 