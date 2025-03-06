import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useGetInputValueAtIndex } from "./getInputValueAtIndex";
import { useProcessRoles } from "./useProcessRoles";

export function useExportToExcel() {
    const { processedRolesData, tasksError, absencesError, isLoading } = useProcessRoles();
    const projectHeaderInputValue = useGetInputValueAtIndex(
        undefined,
        "projectRow",
        true
    );

    let errorMessage = "";

    if (tasksError || absencesError) {
        errorMessage = tasksError?.message || absencesError?.message || "Erro ao carregar dados";
    } else if (!processedRolesData || processedRolesData.length === 0) {
        errorMessage = "Nenhum dado disponível para exportação.";
    }

    const exportExcel = () => {
        if (errorMessage) {
            return; // Não executa a exportação se houver erro
        }

        const ws = XLSX.utils.json_to_sheet(processedRolesData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Projetos");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const fileData = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });

        const fileName = `Relatorio_${projectHeaderInputValue || "Projeto"}.xlsx`;
        saveAs(fileData, fileName);
    };

    return {
        exportExcel,
        errorMessage,
        isLoading
    };
}