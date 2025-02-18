import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { TextButton } from "~/components/widgets/TextButton";
import { ButtonsContainer } from "./styles";
import { BsFiletypePdf } from "react-icons/bs";

export const ExportXlsxButton = () => {
  const mockData = [
    {
      Projeto: "Projeto A",
      Pessoa: "João Silva",
      Cargo: "Desenvolvedor",
      "Mês Referência": "Janeiro/2025",
      "Horas Planejadas": 180,
      Ausências: 20,
      "Horas Trabalhadas": 180 - 20,
      "Valor/Hora": 50,
      "Valor/Mês": (180 - 20) * 50,
    },
    {
      Projeto: "Projeto B",
      Pessoa: "Maria Souza",
      Cargo: "Designer",
      "Mês Referência": "Janeiro/2025",
      "Horas Planejadas": 170,
      Ausências: 15,
      "Horas Trabalhadas": 170 - 15,
      "Valor/Hora": 45,
      "Valor/Mês": (170 - 15) * 45,
    },
  ];

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(mockData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Projetos");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(fileData, "Relatorio_Projetos.xlsx");
  };

  return (
    <ButtonsContainer>
      <TextButton
        text="Xslx"
        action={exportToExcel}
        icon={<PiMicrosoftExcelLogoFill size={24} />}
      />

      <TextButton text="Pdf" icon={<BsFiletypePdf size={24} />} />
    </ButtonsContainer>
  );
};
