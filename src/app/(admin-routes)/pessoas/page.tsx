"use client";

import { FormForPeople } from "~/components/forms/FormForPeople";
import { AvailableFields } from "~/components/surfaces/AvailableFieldsTable";
import { ProjectHeader } from "~/components/surfaces/ProjectHeader";
import { BodyContainer, Container, InputsContent } from "./styles";
import { projectSelectedValuePropAtom } from "~/@atom/ProjectStates/projectSelectedValue";
import { useAtom } from "jotai";

export default function Pessoas() {
  const [projectSelectedValue] = useAtom(projectSelectedValuePropAtom);

  return (
    <Container>
      <ProjectHeader.Root>
        <ProjectHeader.BoxImage
          projectName={projectSelectedValue?.selectedValue[`projectRow-text`]}
        />
        <InputsContent>
          <ProjectHeader.EditProject />
        </InputsContent>
      </ProjectHeader.Root>

      <BodyContainer>
        <AvailableFields />
        <FormForPeople />
      </BodyContainer>
    </Container>
  );
}
