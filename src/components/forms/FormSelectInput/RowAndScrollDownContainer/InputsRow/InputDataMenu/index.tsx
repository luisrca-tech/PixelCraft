import { poppins } from "~/app/fonts";
import { Container } from "./styles";
import { useGetLastRowIndex } from "~/utils/functions/getLastRowIndex";
import { useAtom } from "jotai";
import { rangesAtom } from "~/@atom/ProjectStates/rangesAtom";
import { useInputDataMenuClick } from "~/utils/functions/inputDataMenuClick";
import Image from "next/image";
import CalendarIcon from "public/calendaricon.svg";

type InputDataMenuProps = {
  row: string;
};
export function InputDataMenu({ row }: InputDataMenuProps) {
  const [ranges] = useAtom(rangesAtom);
  const lastRowIndex = useGetLastRowIndex();
  const isLastRow = row === lastRowIndex;
  const isRangeInThisRow =
    isLastRow ||
    (ranges?.[row]?.startDate && ranges?.[row].endDate !== undefined);

  const { handleInputDataMenuClick } = useInputDataMenuClick();

  return (
    <Container
      className={poppins.className}
      // disabled={isLastRow}
      isRangeInThisRow={isRangeInThisRow}
      onClick={() => handleInputDataMenuClick(row)}
      isLastRow={isLastRow}
      type="button"
    >
      <span>Datas</span>
      <Image
        src={CalendarIcon}
        width={24}
        height={24}
        alt="Icone de Calendário"
      />
    </Container>
  );
}
