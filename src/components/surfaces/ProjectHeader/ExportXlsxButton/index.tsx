import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { TextButton } from "~/components/widgets/TextButton";
import { ButtonsContainer } from "./styles";
import { BsFiletypePdf } from "react-icons/bs";
import { useAtom } from "jotai";
import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";
import { useExportToExcel } from "~/utils/functions/exportToExcel";
import { showToast } from "~/utils/functions/showToast";

export const ExportButtons = () => {
  const [checked] = useAtom(checkedAtom);
  const { exportExcel, errorMessage, isLoading } = useExportToExcel();

  const handleExport = async () => {
    if (errorMessage) {
      showToast("error", errorMessage);
      return;
    }
    exportExcel();
    showToast("success", "Tabela exportada com sucesso");
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
          <TextButton text="Pdf" icon={<BsFiletypePdf size={24} />} disabled />
        </ButtonsContainer>
      )}
    </>
  );
};
