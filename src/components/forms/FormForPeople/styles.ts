import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: calc(100vh - 37rem);
`;

export const RoleAndPerson = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 1rem;
    color: ${theme.COLORS.DARK};
    font-weight: 600;
    line-height: 28px;
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

  padding: 0.4rem 0.75rem;

  input,
  span {
    font-size: 1rem;
    color: ${theme.COLORS.SECONDARY_DARK};
    line-height: 24px;
  }

  input {
    width: 50%;
    border: none;
    background-color: transparent;
    outline: none;
  }
`;
