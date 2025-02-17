import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import { theme } from "~/app/styles/theme";

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
`;

export const Content = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${theme.COLORS.WHITE};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 5;


  @media(min-width: 1024px){
    width: 50vh;
  }
`;

export const Title = styled(Dialog.Title)`
    font-size: 1.3rem;
    color: ${theme.COLORS.DARK};
    font-weight: 700;
    

    @media(min-width: 1024px){
        font-size: 2rem;
  }

`

export const CloseButton = styled(Dialog.Close)`
  background: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
`;

export const MonthsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: flex-start;
    width: 100%;
    max-height: 14.75rem;
    overflow-y: auto;
    margin: 2rem 0;
    padding-bottom: 1rem;
    
    &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.COLORS.PRIMARY};
    border-radius: 20px;
    border: 3px solid ${theme.COLORS.SELECT_INPUT};
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${theme.COLORS.DARK};
  }
    > div {
      display: flex;
      flex-direction: column;
      width: 90%;

      > label {
        font-size: 1rem;
        font-weight: 600;
        color: ${theme.COLORS.DARK};

        @media(min-width: 1024px) {
          font-size: 1.3rem;
        }
      }
    }
    
    @media(min-width: 1024px) {
        gap: 2rem;
    }
`;


