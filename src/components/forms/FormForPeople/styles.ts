import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: calc(100vh - 33rem);
`;

export const RoleAndPerson = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;

  span {
    font-size: 1rem;
    color: ${theme.COLORS.DARK};
    font-weight: 600;
    line-height: 28px;
    width: 100%;

    @media(min-width: 1024px){
      font-size: 1.2rem;
    }
  }

  span:nth-child(2),
  span:nth-child(3) {
    text-align: center;
    display: flex; 
    justify-content: center;
  }
  
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  gap: 0.5rem;
  padding-bottom: 0.5rem;

  p {
    font-size: 0.875rem;
    color: red;
    line-height: 28px;
  }

  &::-webkit-scrollbar {
    width: 0;
  }
`;

export const PersonByRole = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.COLORS.LIGHT};
  border-radius: 60px;
  margin-bottom: 1rem;
  padding: 0.4rem 0.75rem;

  input,
  span {
    font-size: 1rem;
    color: ${theme.COLORS.SECONDARY_DARK};
    line-height: 24px;
    font-weight: 500;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    @media(min-width: 1024px){
      font-size: 1.2rem;
    }
  }

  input {
  
    border: none;
    background-color: transparent;
    outline: none;
  }
`;
