import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { TextButton } from "~/components/widgets/TextButton";
import { ButtonsContainer } from "./styles";
import { BsFiletypePdf } from "react-icons/bs";
import { useAtom } from "jotai";
import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";

import { useExportToExcel } from "~/utils/functions/exportToExcel";

export const ExportButtons = () => {
  const [checked] = useAtom(checkedAtom);
  const exportExcel = useExportToExcel();
  return (
    <>
      {!checked && (
        <ButtonsContainer>
          <TextButton
            text="Xslx"
            action={exportExcel}
            icon={<PiMicrosoftExcelLogoFill size={24} />}
          />
          <TextButton text="Pdf" icon={<BsFiletypePdf size={24} />} disabled />
        </ButtonsContainer>
      )}
    </>
  );
};
