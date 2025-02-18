import { theme } from "~/app/styles/theme";
import { styled } from "@linaria/react";

export const Container = styled.label`
  width: 5rem;
  min-width: 5rem;
  height: 100%;
  background: ${theme.COLORS.PRIMARY};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;


  @media(max-width: 1024px){
    width: 4rem;
    min-width: 4rem;
  }

  span {
    color: ${theme.COLORS.WHITE};
    font-size: 1.5rem;
    font-family: "Roboto";
  }

  input {
    display: none;
  }
`;
