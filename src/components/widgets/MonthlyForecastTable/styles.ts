import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

export const ForecastContainer = styled.div`
  max-height: 4rem;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const ForecastGrid = styled.div`
  display: flex;

  &.keen-slider {
    overflow: hidden;
  }
`;

export const ForecastItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 12.5rem;
  flex: 0 0 auto;

  &.keen-slider__slide {
    flex: 0 0 auto;
  }

  span {
    color: ${theme.COLORS.DARK};
    font-size: 0.875rem;
    font-weight: 600;

    &:last-child {
      font-weight: normal;
    }
  }
`;
