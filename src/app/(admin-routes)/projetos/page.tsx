"use client";

import { ProjectsCards } from "~/components/surfaces/project-card";
import { Container, StatsSection, StatCard, ProjectsSection } from "./styles";
import { IoStatsChart, IoCheckmarkDone, IoTime } from "react-icons/io5";
import { poppins } from "~/assets/fonts/fonts";

export default function Projetos() {
  return (
    <Container>
      <StatsSection>
        <StatCard>
          <div className="stat-icon">
            <IoStatsChart size={24} />
          </div>
          <div className="stat-info">
            <span>Total de Projetos</span>
            <h3 className={poppins.className}>3</h3>
          </div>
        </StatCard>

        <StatCard>
          <div className="stat-icon completed">
            <IoCheckmarkDone size={24} />
          </div>
          <div className="stat-info">
            <span>Projetos Concluídos</span>
            <h3 className={poppins.className}>2</h3>
          </div>
        </StatCard>

        <StatCard>
          <div className="stat-icon pending">
            <IoTime size={24} />
          </div>
          <div className="stat-info">
            <span>Em Andamento</span>
            <h3 className={poppins.className}>1</h3>
          </div>
        </StatCard>
      </StatsSection>

      <ProjectsSection>
        <ProjectsCards />
      </ProjectsSection>
    </Container>
  );
}
