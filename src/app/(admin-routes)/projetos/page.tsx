"use client";

import { ProjectsCards } from "~/components/surfaces/project-card";
import { Container, StatsSection, StatCard, ProjectsSection } from "./styles";
import { IoStatsChart, IoCheckmarkDone, IoTime } from "react-icons/io5";
import { poppins } from "~/assets/fonts/fonts";
import { useFilteredTasksByProject } from "~/hooks/useFilteredTasksByProject";
import { useProjectsInfos } from "~/utils/functions/useProjectsInfos";

export default function Projetos() {
  const { filteredTasksByProject } = useFilteredTasksByProject();

  const { completedCount, ongoingCount, totalCount } = useProjectsInfos(
    filteredTasksByProject
  );

  return (
    <Container>
      <StatsSection className="mobile-only">
        <StatCard>
          <div className="stat-icon">
            <IoStatsChart size={24} />
          </div>
          <div className="stat-info">
            <span>Total de Projetos</span>
            <h3 className={poppins.className}>{totalCount ? totalCount : 0}</h3>
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
            <h3 className={poppins.className}>{ongoingCount}</h3>
          </div>
        </StatCard>
      </StatsSection>

      <ProjectsSection>
        <ProjectsCards />
      </ProjectsSection>
    </Container>
  );
}
