import { styled } from "@linaria/react";

type ContainerProps = {
  checked?: boolean;
};
export const Container = styled.div<ContainerProps>`
  display: ${(props) => (props.checked ? `flex` : `none`)};
  width: 100%;
  align-items: center;

  @media (min-width: 1024px) {
    font-size: 1.25rem;
  }
`;
export const DatesContainer = styled.div`
  display: flex;
  gap: 0.2rem;
  padding: 4px;

  font-family: "Roboto";
  font-size: 1rem;
  font-weight: Regular;

  > p {
    font-size: 0.875rem;

    @media (min-width: 1024px) {
      font-size: 1.25rem;
    }
  }
`;
