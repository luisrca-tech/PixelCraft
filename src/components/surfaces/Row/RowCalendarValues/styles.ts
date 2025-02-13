import { styled } from "@linaria/react";

export const Container = styled.div`
  display: flex;
  gap: 0.2rem;
  height: 100%;
  align-items: center;
  font-family: "Roboto";
  font-size: 1rem;
  font-weight: Regular;
  padding: 0 10px 0;
  border: none;
  background-color: transparent;

  
  @media(min-width: 1024px){
    font-size: 1.2rem;
  }
`;
