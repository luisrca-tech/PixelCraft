import { styled } from "@linaria/react";

export const Container = styled.div`
  padding: 0 5%;
  position: fixed;
  max-width: none;
  width: 100%;
  bottom: 2rem;
  left: 0;
  gap: 1rem;
  display: flex;
  flex-direction: column;


  @media(min-width: 1600px){
    max-width: 90rem;
    padding: 0;
    left: auto;
  }
  
`;
