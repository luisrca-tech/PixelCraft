import { styled } from "@linaria/react";

export const Container = styled.div`
  display: flex;
  gap: 0.8rem;
  margin: 1rem 1rem;
`;

export const CardContentDescriptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  font-size: 13px;

  @media(min-width: 1024px){
      font-size: 1rem;
    }

  p {
    display: flex;
    gap: 4px;
  }
`;
