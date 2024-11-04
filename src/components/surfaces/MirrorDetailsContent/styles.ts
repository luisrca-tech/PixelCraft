import { styled } from "@linaria/react";

interface FormContainerProps {
  isDatePickerOpen: boolean;
}

export const MainContainer = styled.div`
  margin-top: 12.5rem;
  padding: 0 5%;
  width: 100%;
  height: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TableContainer = styled.div<FormContainerProps>`
  filter: ${(props) => (props.isDatePickerOpen ? `blur(2px)` : `none`)};
  width: 100%;
  pointer-events: ${(props) => (props.isDatePickerOpen ? `none` : `auto`)};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: calc(100vh - 430px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }

  @media (min-width: 1024px) {
    height: calc(100vh - 400px);
  }
`;

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
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

export const LoadingCustomFields = styled.p`
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 1rem;
`;
