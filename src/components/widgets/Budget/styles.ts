import { styled } from "@linaria/react";

export const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 0 0.5rem;
  justify-content: space-between;
  gap: 5rem;
  
`;

export const ProjectDuration = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  span {
    font-size: 0.875rem;
    font-weight: bold;

    @media(min-width: 1024px){
      font-size: 1.2rem;
    }
  
  }


`;

export const BudgetContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 1rem;
    font-weight: bold;

    @media(min-width: 1024px){
    font-size: 1.2rem;
  }
  }
`;
