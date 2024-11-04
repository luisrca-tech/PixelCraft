import { styled } from "@linaria/react";

interface FormContainerProps {
  isDatePickerOpen: boolean;
}

export const Container = styled.div<FormContainerProps>`
  filter: ${(props) => (props.isDatePickerOpen ? `blur(2px)` : `none`)};
  width: 100%;
  pointer-events: ${(props) => (props.isDatePickerOpen ? `none` : `auto`)};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: calc(100vh - 430px);

  @media (min-width: 1024px) {
    height: calc(100vh - 400px);
  }
`;
