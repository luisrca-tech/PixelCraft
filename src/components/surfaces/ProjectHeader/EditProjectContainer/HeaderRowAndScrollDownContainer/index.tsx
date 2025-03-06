"use client";
import { Container } from "./styles";
import { useAtom } from "jotai";
import ScrollDownContainer from "~/components/forms/FormSelectInput/ScrollDownContainer";
import { useToggleSelectOpen } from "~/utils/functions/toggleSelectedOpen";
import { useIsSelectOpen } from "~/utils/functions/isSelectOpen";
import { useSearchParams } from "next/navigation";
import { projectsWihoutTasksAtom } from "~/@atom/ProjectStates/projectsWithoutTasksAtom";
import HeaderSelectInput from "./HeaderSelectInput";

export default function HeaderRowAndScrollDownContainer() {
  const [projectWihoutTasks] = useAtom(projectsWihoutTasksAtom);
  const isProjectOptions = !!projectWihoutTasks?.length;
  const row = "projectRow";
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const toggleSelectOpen = useToggleSelectOpen(row);

  return (
    <Container key={row}>
      <HeaderSelectInput setIsSelectOpen={toggleSelectOpen} row={row} />

      {useIsSelectOpen(row) && !projectId && !!isProjectOptions && (
        <ScrollDownContainer row={row} />
      )}
    </Container>
  );
}
