import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

export const Container = styled.div`
  margin-top: -1.75rem;
`;

export const BackgroundProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: ${theme.COLORS.SECONDARY_LIGTH};
  border-radius: 8px;
  
`;

export const ProgressBarContent = styled.div`
  max-width: 100%;
  height: 6px;
  background-color: ${theme.COLORS.PRIMARY};
  border-radius: 8px;
`;
