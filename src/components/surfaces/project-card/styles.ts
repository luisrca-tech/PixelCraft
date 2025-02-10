import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";
import { darken } from "polished";

export const Container = styled.div`
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1.25rem;
  @media (min-width: 1024px) {
    margin-top: 0;
  }
`;

export const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 5rem;
  gap: 1rem;
  background-color: ${theme.COLORS.SECONDARY_EXTRA_LIGTH};
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 ${theme.COLORS.DARK};
  clip-path: inset(1);
  cursor: pointer;

  &:hover {
    background-color: ${darken(0.1, theme.COLORS.SECONDARY_EXTRA_LIGTH)};
  }
`;
