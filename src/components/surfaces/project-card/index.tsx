"use client";

import { useRouter } from "next/navigation";

import { useFilteredTasksByProject } from "~/hooks/useFilteredTasksByProject";
import { CardContent } from "./CardContent";
import { CardContentSkeleton } from "./CardContentSkeleton";
import { ProgressBar } from "./ProgressBar";
import { Container, ProjectContainer } from "./styles";
import { NotFound } from "~/components/widgets/NotFound";

export function ProjectsCards() {
  const router = useRouter();

  const { filteredTasksByProject, isLoading, isError } =
    useFilteredTasksByProject();

  function HandleClickProjectCard(projectId: string) {
    router.push(`/espelho?projectId=${projectId}`);
  }

  if (isError) {
    return (
      <NotFound
        message="Nenhum projeto encontrado, por favor, verifique suas configurações!"
        buttonAction={() => router.push("/configuracao")}
        buttonText="Ir para configuração"
      />
    );
  }
  return (
    <Container>
      {!isLoading ? (
        <>
          {filteredTasksByProject?.map(({ project, dates }) => (
            <ProjectContainer
              key={project.id}
              onClick={() => HandleClickProjectCard(project.id)}
            >
              <CardContent
                project={project}
                dates={dates}
              />

              <ProgressBar project={project} />
            </ProjectContainer>
          ))}
        </>
      ) : (
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <ProjectContainer key={index}>
              <CardContentSkeleton />
            </ProjectContainer>
          ))}
        </>
      )}
    </Container>
  );
}
