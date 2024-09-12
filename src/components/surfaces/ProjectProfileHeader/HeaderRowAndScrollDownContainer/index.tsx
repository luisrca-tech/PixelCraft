"use client";
import { Container } from "./styles";
import { useAtom } from "jotai";
import { projectSelectedValuePropAtom } from "~/@atom/ProjectStates/projectSelectedValue";
import ScrollDownContainer from "../../../forms/FormSelectInput/ScrollDownContainer";
import { useToggleSelectOpen } from "~/app/utils/functions/toggleSelectedOpen";
import { useIsSelectOpen } from "~/app/utils/functions/isSelectOpen";
import { useSearchParams } from "next/navigation";
import { projectOptionsAtom } from "~/@atom/api/CustomFields/projectOptionsAtom";
import HeaderSelectInput from "./HeaderSelectInput";
import { useEffect } from "react";

export default function HeaderRowAndScrollDownContainer() {
  const [projectOptions] = useAtom(projectOptionsAtom);
  const isProjectOptions = !!projectOptions?.length;

  useEffect(() => {
    console.log(
      projectOptions,
      `projectOptions`,
      isProjectOptions,
      `isProjectOptions`
    );
  }, [isProjectOptions, projectOptions]);
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
