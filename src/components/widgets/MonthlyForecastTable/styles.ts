import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

export const ForecastContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: grab;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .desktop-only {
      @media (max-width: 1024px) {
        display: none;
      }
    }
  }

  button {
    cursor: pointer;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    color: inherit;
    border: none;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${theme.COLORS.DARK};
    text-align: end;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
  }
`;

export const CarouselHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem 0;
`;

export const ForecastGrid = styled.div`
  width: 100%;
  position: relative;
`;

export const ForecastItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  span:first-child {
    font-size: 0.75rem;
    color: ${theme.COLORS.GRAY};
    text-transform: capitalize;
  }

  span:last-child {
    font-size: 0.875rem;
    font-weight: 600;
    color: ${theme.COLORS.DARK};
  }

  @media (min-width: 1024px) {
    padding: 1rem;

    span:first-child {
      font-size: 0.875rem;
    }

    span:last-child {
      font-size: 1rem;
    }
  }

  @media (min-width: 1024px) {
    background: ${theme.COLORS.WHITE};
    border: 1px solid ${theme.COLORS.LIGHT};
    border-radius: 8px;
    padding: 0.5rem;
  }
`;
