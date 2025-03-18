import { useState } from "react";
import { Container } from "./styles";
import { useAtom } from "jotai";
import { rowsAndSelectedValuesAtom } from "~/@atom/ProjectStates/rowsAndSelectedValuesAtom";
import { useGetLastRowIndex } from "~/utils/functions/getLastRowIndex";
import { useIsSelectOpen } from "~/utils/functions/isSelectOpen";
import ScrollDownContainer from "~/components/forms/FormSelectInput/ScrollDownContainer";
import { InputsRow } from "./InputsRow";
import { api } from "~/trpc/react";
import { useSession } from "@clerk/nextjs";
import { useRemoveRow } from "~/utils/functions/removeRow";

interface RowAndScrollDownContainerProps {
  row: string;
}

export default function RowAndScrollDownContainer({
  row,
}: RowAndScrollDownContainerProps) {
  const mutationDeleteTask = api.clickup.deleteTask.useMutation();
  const { session } = useSession();
  const userId = session?.user.id;
  const [rowsAndSelectedValues, setRowsAndSelectedValues] = useAtom(
    rowsAndSelectedValuesAtom
  );
  const { removeRow } = useRemoveRow();

  const [startX, setStartX] = useState<number | null>(null);
  const [offsetXByRow, setOffsetXByRow] = useState<{ [key: string]: number }>(
    {}
  );

  const lastRowIndex = useGetLastRowIndex();
  const isLastRow = row === lastRowIndex;

  // async function removeRow(rowIndex: string) {
  //   const taskId = rowsAndSelectedValues.selectedValues[`taskId${rowIndex}`];
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

  //   await mutationDeleteTask.mutateAsync({
  //     taskId: taskId,
  //     userId: userId ?? "",
  //   });
  // }

  function handleTouchStartForRow(event: React.TouchEvent, rowIndex: string) {
    if (event.touches[0]) {
      setStartX(event.touches[0].clientX);
    }

    setOffsetXByRow((prevOffsetX) => ({
      ...prevOffsetX,
      [rowIndex]: 0,
    }));
  }

  function handleTouchMove(event: React.TouchEvent, rowIndex: string) {
    if (startX !== null) {
      if (event.touches[0]) {
        const newOffsetX = event.touches[0].clientX - startX;

        if (newOffsetX < 0) {
          setOffsetXByRow((prevState) => ({
            ...prevState,
            [rowIndex]: newOffsetX,
          }));
        }
      }
    }
  }

  function handleTouchEndForRow(rowIndex: string) {
    if (offsetXByRow[rowIndex] && Math.abs(offsetXByRow[rowIndex]) > 100) {
      if (rowIndex !== lastRowIndex) {
        removeRow(rowIndex, userId);
      }
    } else {
      setOffsetXByRow((prevOffsetX) => ({
        ...prevOffsetX,
        [rowIndex]: 0,
      }));
    }
    setStartX(null);
  }

  return (
    <>
      <Container
        key={row}
        offsetXByRow={offsetXByRow}
        offsetX={offsetXByRow[row]}
        onTouchStart={(e) => handleTouchStartForRow(e, row)}
        onTouchMove={(e) => handleTouchMove(e, row)}
        onTouchEnd={() => handleTouchEndForRow(row)}
        isLastRow={isLastRow}
      >
        <InputsRow row={row} />
        {useIsSelectOpen(row) && <ScrollDownContainer row={row} />}
      </Container>
    </>
  );
}
