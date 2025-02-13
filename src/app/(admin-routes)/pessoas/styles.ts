import { styled } from "@linaria/react";

export const Container = styled.div`
  margin-top: 12.5rem;
  padding: 0 5%;
  max-width: none;
  width: 100%;
  height: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media(min-width: 1600px){
   
    padding: 0 !important;
  }
`;

export const BodyContainer = styled.div`
  width: 100%;
  height: calc(100vh - 16rem);
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;

  padding-bottom: 2rem;
`;

export const InputsContent = styled.div`
  display: flex;
  gap: 0.2rem;
  align-items: center;
  flex-direction: column;
  font-family: "Roboto";
  font-size: 1rem;
  width: 100%;
`;
