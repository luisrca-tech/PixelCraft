import { theme } from "~/app/styles/theme";
import { styled } from "@linaria/react";

export const Container = styled.div`
  width: 100%;
  height: 5rem;
  top: 6rem;
  position: fixed;
  max-width: 90rem;
  padding: 0 4.5% !important;
  

>div{
  width: 100%;
  height: 5rem;
  border-radius: 5px;
 
  background: ${theme.COLORS.SECONDARY_EXTRA_LIGTH};
  display: flex;
 
  justify-content: center;
  align-items: center;
  
  z-index: 3;
  border-bottom-left-radius: 10px;

  height: 5rem;
  gap: 1rem;
}

  @media(min-width: 1600px){
    padding: 0 !important;
  }




`;


