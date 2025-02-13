import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 0 auto;
  padding: 0 2rem;

  h1 {
    font-size: 1rem;
  }

  .mobile-only {
    @media (max-width: 1024px) {
      display: none;
    }
  }

  @media (min-width: 1024px) {
    max-width: 87.5rem;
    padding: 0 4rem;
    gap: 4rem;

    h1 {
      font-size: 1.25rem;
    }
  }


`;

export const StatsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    padding-top: 8.5rem;
  }
`;

export const StatCard = styled.div`
  background: ${theme.COLORS.WHITE};
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid ${theme.COLORS.LIGHT};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    border-color: ${theme.COLORS.PRIMARY}40;
  }

  .stat-icon {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    background-color: ${theme.COLORS.PRIMARY};
    color: ${theme.COLORS.WHITE};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &.completed {
      background-color: ${theme.COLORS.SUCCESS};
    }

    &.pending {
      background-color: ${theme.COLORS.WARNING};
    }
  }

  .stat-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    span {
      font-size: 0.875rem;
      color: ${theme.COLORS.GRAY};
      font-weight: 500;
    }

    h3 {
      font-size: 2rem;
      font-weight: 700;
      color: ${theme.COLORS.DARK};
      margin: 0;
    }
  }

  @media (min-width: 1024px) {
    padding: 2rem;

    .stat-icon {
      width: 56px;
      height: 56px;

      svg {
        width: 28px;
        height: 28px;
      }
    }

    .stat-info {
      h3 {
        font-size: 2.5rem;
      }

      span {
        font-size: 1rem;
      }
    }

    &:hover .stat-icon {
      transform: scale(1.1);
    }
  }
`;

export const ProjectsSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 1024px) {
    gap: 2rem;

    > div {
      
      @media(min-width:1440px){
        grid-template-columns: 1fr 1fr 1fr;
      };
      display: grid;
      grid-template-columns: 1fr 1fr ;
      width: 100%;
      gap: 2rem;
      transition: all 0.3s ease-in-out;
      transform-origin: top;

      &:hover {
        transform: scale(0.99);
      }

      > div {
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-8px);
          z-index: 1;
        }
      }
    }
  }

  
`;
