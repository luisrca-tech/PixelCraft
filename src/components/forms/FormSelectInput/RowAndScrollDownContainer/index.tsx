import { useState } from "react";
import { Container } from "./styles";
import { useGetLastRowIndex } from "~/utils/functions/getLastRowIndex";
import { useIsSelectOpen } from "~/utils/functions/isSelectOpen";
import ScrollDownContainer from "~/components/forms/FormSelectInput/ScrollDownContainer";
import { InputsRow } from "./InputsRow";
import { useSession } from "@clerk/nextjs";
import { useRemoveRow } from "~/utils/functions/removeRow";

interface RowAndScrollDownContainerProps {
  row: string;
}

export default function RowAndScrollDownContainer({
  row,
}: RowAndScrollDownContainerProps) {
  const { session } = useSession();
  const userId = session?.user.id;
  const { removeRow } = useRemoveRow();
  const [startX, setStartX] = useState<number | null>(null);
  const [offsetXByRow, setOffsetXByRow] = useState<{ [key: string]: number }>(
    {}
  );

  const lastRowIndex = useGetLastRowIndex();
  const isLastRow = row === lastRowIndex;

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
