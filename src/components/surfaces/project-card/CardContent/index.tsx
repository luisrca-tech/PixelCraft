"use client";

import { poppins } from "~/app/fonts";
import { CardContentDescriptions, Container } from "./styles";
import { type OptionType } from "~/server/types/Clickup.type";
import { ProjectHeader } from "../../ProjectHeader";
type CardContentType = {
  project: OptionType;
  dates:
    | {
        minStartDate: number | null;
        maxEndDate: number | null;
      }
    | undefined;
};
export function CardContent({ project, dates }: CardContentType) {
  function formatDate(timestamp: number | null): string {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleDateString("pt-BR");
  }
  return (
    <Container>
      <ProjectHeader.BoxImage projectName={project.label} />
      <CardContentDescriptions className={poppins.className}>
        <strong>{project.label}</strong>

        <p>
          <span>Duração</span>:{}
          <span>{dates && formatDate(dates.minStartDate)}</span>
          <span>-</span>
          <span>{dates && formatDate(dates.maxEndDate)}</span>
        </p>
      </CardContentDescriptions>
    </Container>
  );
}
