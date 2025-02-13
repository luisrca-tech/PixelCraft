"use client";

import { ProjectsCards } from "~/components/surfaces/project-card";
import { Container, StatsSection, StatCard, ProjectsSection } from "./styles";
import { IoStatsChart, IoCheckmarkDone, IoTime } from "react-icons/io5";
import { poppins } from "~/assets/fonts/fonts";
import { useFilteredTasksByProject } from "~/hooks/useFilteredTasksByProject";

export default function Projetos() {
  const { filteredTasksByProject } = useFilteredTasksByProject();
  const currentDate = Date.now();

  const completedProjects = filteredTasksByProject.filter((item) => {
    return (
      item.dates.maxEndDate !== null && item.dates.maxEndDate < currentDate
    );
  });

  const completedCount = completedProjects.length;

  const onGoingProjects = filteredTasksByProject.filter((item) => {
    return (
      item.dates.maxEndDate !== null && item.dates.maxEndDate >= currentDate
    );
  });

  const onGoingCount = onGoingProjects.length;

  return (
    <Container>
      <StatsSection className="mobile-only">
        <StatCard>
          <div className="stat-icon">
            <IoStatsChart size={24} />
          </div>
          <div className="stat-info">
            <span>Total de Projetos</span>
            <h3 className={poppins.className}>
              {filteredTasksByProject?.length ? (
                filteredTasksByProject.length
              ) : (
                <p style={{ fontSize: "1.25rem" }}>Loading...</p>
              )}
            </h3>
          </div>
        </StatCard>

        <StatCard>
          <div className="stat-icon completed">
            <IoCheckmarkDone size={24} />
          </div>
          <div className="stat-info">
            <span>Projetos Concluídos</span>
            <h3 className={poppins.className}>{completedCount}</h3>
          </div>
        </StatCard>

        <StatCard>
          <div className="stat-icon pending">
            <IoTime size={24} />
          </div>
          <div className="stat-info">
            <span>Em Andamento</span>
            <h3 className={poppins.className}>{onGoingCount}</h3>
          </div>
        </StatCard>
      </StatsSection>

      <ProjectsSection>
        <ProjectsCards />
      </ProjectsSection>
    </Container>
  );
}
