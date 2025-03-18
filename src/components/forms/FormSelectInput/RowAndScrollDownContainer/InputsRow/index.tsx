import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";
import {
  Container,
  DeleteButtonAnimationFrame,
  DeleteButtonOnDesktop,
} from "./styles";
import { useAtom } from "jotai";
import SelectInput from "~/components/inputs/SelectInput";
import { useToggleSelectOpen } from "~/utils/functions/toggleSelectedOpen";
import { rowsAndSelectedValuesAtom } from "~/@atom/ProjectStates/rowsAndSelectedValuesAtom";
import { useState } from "react";
import { useGetLastRowIndex } from "~/utils/functions/getLastRowIndex";
import Image from "next/image";
import TrashAnimation from "public/trashanimation.svg";
import NumberValueInput from "~/components/inputs/NumberValueInput";
import { rangesAtom } from "~/@atom/ProjectStates/rangesAtom";
import { CalendarDateValues } from "./CalendarDateValues";
import { InputDataMenu } from "./InputDataMenu";
import trash from "../../../../../../public/trashanimation.svg";
import { useRemoveRow } from "~/utils/functions/removeRow";
import { useSession } from "@clerk/nextjs";

type InputRowProps = {
  row: string;
};
export function InputsRow({ row }: InputRowProps) {
  const { session } = useSession();
  const userId = session?.user.id;
  const [checked] = useAtom(checkedAtom);
  const [ranges] = useAtom(rangesAtom);
  const toggleSelectOpen = useToggleSelectOpen(row);
  const [, setRowsAndSelectedValues] = useAtom(rowsAndSelectedValuesAtom);
  const [offsetXByRow] = useState<{ [key: string]: number }>({});
  const { removeRow } = useRemoveRow();
  const lastRowIndex = useGetLastRowIndex();
  const isLastRow = row === lastRowIndex;

  // function removeRow(rowIndex: string) {
  //   setRowsAndSelectedValues((prevState) => {
  //     const removedRows = prevState.rows.filter((row) => row !== rowIndex);
  //     const updatedSelectedValues = { ...prevState.selectedValues };

  //     Object.keys(updatedSelectedValues).forEach((key) => {
  //       if (
  //         key.includes(`firstTextValue${rowIndex}`) ||
  //         key.includes(`secondTextValue${rowIndex}`) ||
  //         key.includes(`thirdTextValue${rowIndex}`)
  //       ) {
  //         delete updatedSelectedValues[key];
  //       }
  //     });

  //     return {
  //       rows: removedRows,
  //       selectedValues: updatedSelectedValues,
  //     };
  //   });
  // }

  function handleInputChange(row: string, value: string) {
    setRowsAndSelectedValues((prevState) => ({
      ...prevState,
      selectedValues: {
        ...prevState.selectedValues,
        [`${row}-text`]: value,
      },
    }));
  }

  return (
    <Container checked={checked}>
      <SelectInput setIsSelectOpen={toggleSelectOpen} row={row} />
      {/* <DeleteButtonAnimationFrame
        onClick={() => removeRow(row)}
        offsetX={offsetXByRow[row] || 0}
        offsetXByRow={offsetXByRow}
        isLastRow={isLastRow}
        type="button"
      >
        <Image src={TrashAnimation} alt="" width={20} height={20} />
      </DeleteButtonAnimationFrame> */}
      {!checked ? (
        <>
          <NumberValueInput
            onChange={(value) =>
              handleInputChange(`secondTextValue${row}`, value)
            }
            isLastRow={isLastRow}
            row={row}
            textValueType="secondTextValue"
            placeHolder="Horas"
          />

          <NumberValueInput
            onChange={(value) =>
              handleInputChange(`thirdTextValue${row}`, value)
            }
            isLastRow={isLastRow}
            row={row}
            textValueType="thirdTextValue"
            placeHolder="Valor"
          />

          {!isLastRow && (
            <DeleteButtonOnDesktop
              onClick={() => removeRow(row, userId)}
              type="button"
            >
              <Image src={trash} alt="delete-icon" />
            </DeleteButtonOnDesktop>
          )}
        </>
      ) : (
        <>
          {ranges[row]?.isSelected ? (
            <CalendarDateValues row={row} />
          ) : (
            <InputDataMenu row={row} />
          )}
        </>
      )}
    </Container>
  );
}
