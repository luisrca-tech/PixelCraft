import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

export const ForecastContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: grab;

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

export const NavigationButtons = styled.div`
  display: flex;
  gap: 0.25rem;

  button {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    border: 1px solid ${theme.COLORS.LIGHT};
    background: ${theme.COLORS.WHITE};
    color: ${theme.COLORS.PRIMARY};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background: ${theme.COLORS.PRIMARY}10;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

export const ForecastGrid = styled.div`
  width: 100%;
  position: relative;
`;

export const ForecastItem = styled.div`
  background: ${theme.COLORS.WHITE};
  border: 1px solid ${theme.COLORS.LIGHT};
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
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
`;
