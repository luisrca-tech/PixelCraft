import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useGetInputValueAtIndex } from "./getInputValueAtIndex";
import { useProcessRoles } from "./useProcessRoles";

export function useExportToExcel() {
    const processedRolesData = useProcessRoles();
    const projectHeaderInputValue = useGetInputValueAtIndex(
        undefined,
        "projectRow",
        true,
    );

    const exportExcel = () => {
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

    return exportExcel;
}
