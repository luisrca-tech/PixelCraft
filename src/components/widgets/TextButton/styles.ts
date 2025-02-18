import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

export const ButtonContainer = styled.button`
  width: 100%;
  background-color: ${theme.COLORS.PRIMARY};
  height: 2.4rem;
  border: none;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 0px 20px !important;
  color: ${theme.COLORS.WHITE};
  cursor: pointer;
  transition: transform 0.2s ease;

  >span{
    font-size: 1rem;
    font-weight: 700;
    @media(max-width:700px ){
      display: none;
    }
  }

  &:hover {
    transform: scale(1.1);
  }
`;