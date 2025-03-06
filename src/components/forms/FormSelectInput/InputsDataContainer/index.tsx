"use client";

import { useAtom } from "jotai";
import { rowsAndSelectedValuesAtom } from "~/@atom/ProjectStates/rowsAndSelectedValuesAtom";
import { Skeleton } from "~/components/widgets/Skeleton";
import { useTasksOfProject } from "~/hooks/useTasksOfProject";
import RowAndScrollDownContainer from "../RowAndScrollDownContainer";
import { Container, SkeletonContainer } from "./styles";
import ValidationDateError from "./ValidationDateError";
import { selectedItemIndexAtom } from "~/@atom/ProjectStates/selectedItemIndexAtom";

export default function InputsDataContainer() {
  const [selectedItemIndex] = useAtom(selectedItemIndexAtom);
  const { getTasksInfos } = useTasksOfProject();
  const tasks = getTasksInfos();
  const [rowsAndSelectedValues] = useAtom(rowsAndSelectedValuesAtom);
  const rows = rowsAndSelectedValues.rows;

  // Verifica se o selectedItemIndex é igual a 'projectRow'
  const isProjectRowSelected = selectedItemIndex === "projectRow";

  return (
    <Container isProjectRowSelected={isProjectRowSelected}>
      {!!tasks ? (
        <>
          {rows
            .slice()
            .reverse()
            .map((row) => (
              <RowAndScrollDownContainer row={row} key={row} />
            ))}
        </>
      ) : (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonContainer key={index}>
              <Skeleton
                style={{ borderRadius: "60px" }}
                width="95%"
                height="1.25rem"
              />
            </SkeletonContainer>
          ))}
        </>
      )}

      <ValidationDateError />
    </Container>
  );
}
