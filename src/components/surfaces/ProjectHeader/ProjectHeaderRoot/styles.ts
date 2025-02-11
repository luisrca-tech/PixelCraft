import { theme } from "~/app/styles/theme";
import { styled } from "@linaria/react";

export const Container = styled.div`
  width: 100%;
  height: 5rem;
  padding: 0 1rem;
  background: ${theme.COLORS.SECONDARY_EXTRA_LIGTH};
  display: flex;
  justify-content: center;
  align-items: center;
  top: 6rem;
  position: fixed;
  z-index: 3;
  border-bottom-left-radius: 10px;
  left: 0;
  height: 5rem;

  gap: 1rem;

  input {
    border: 0;
    background: transparent;
    outline: none;
    font-size: 1rem;
    font-weight: 600;
    color: ${theme.COLORS.SECONDARY_DARK};
  }

  @media (min-width: 1024px) {
    padding: 0 9%;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 5rem;
  background: ${theme.COLORS.SECONDARY_EXTRA_LIGTH};
  display: flex;

  align-items: center;
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

export const InputsContent = styled.div`
  display: flex;
  gap: 0.2rem;
  align-items: center;
  font-family: "Roboto";
  font-size: 1rem;
  width: 100%;
`;
