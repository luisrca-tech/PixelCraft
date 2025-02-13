import { theme } from "~/app/styles/theme";
import { styled } from "@linaria/react";

export const Container = styled.div`
  width: 100vw;
  height: 5rem;
  background: ${theme.COLORS.SECONDARY_EXTRA_LIGTH};
  display: flex;
  justify-content: center;
  align-items: center;
  top: 6rem;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 3;
  border-bottom-left-radius: 10px;
  height: 5rem;
  padding-left: 1.25rem;
  gap: 1rem;

  input {
    border: 0;
    background: transparent;
    outline: none;
    font-size: 1rem;
    font-weight: 600;
    color: ${theme.COLORS.SECONDARY_DARK};
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 5rem;
  background: ${theme.COLORS.SECONDARY_EXTRA_LIGTH};
  display: flex;

  align-items: center;
  gap: 1rem;


`;
