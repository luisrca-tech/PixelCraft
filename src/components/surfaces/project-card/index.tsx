"use client";

import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFilteredTasksByProject } from "~/hooks/useFilteredTasksByProject";
import { api } from "~/trpc/react";
import { showToast } from "~/utils/functions/showToast";
import { CardContent } from "./CardContent";
import { CardContentSkeleton } from "./CardContentSkeleton";
import { ProgressBar } from "./ProgressBar";
import { Container, ProjectContainer } from "./styles";
import { NotFound } from "~/components/widgets/NotFound";

export function ProjectsCards() {
  const { session } = useSession();
  const userId = session?.user.id;
  const router = useRouter();

  const { filteredTasksByProject, isLoading, isError } =
    useFilteredTasksByProject();

  const getClickupKeys = api.clickup.getClickupKeys.useQuery({
    userId: userId ?? "",
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (
        !getClickupKeys.data?.AuthorizationPkKey &&
        !getClickupKeys.data?.listId
      ) {
        showToast("error", "Não encontramos PK ou ListId cadastrados");
      }
    }, 2000);

    if (
      getClickupKeys.data?.AuthorizationPkKey &&
      getClickupKeys.data?.listId
    ) {
      clearTimeout(timeoutId);
    }
    return () => clearTimeout(timeoutId);
  }, [getClickupKeys, router]);

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
