import { theme } from "~/app/styles/theme";
import { styled } from "@linaria/react";

type ContainerProps = {
  checked: boolean;
  isInProjectHeader: boolean;
};

type InputProps = {
  isLastRow?: boolean;
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  width: ${(props) =>
    props.checked
      ? "calc(100% - 28px)"
      : props.isInProjectHeader
        ? "100%"
        : "32%"};
  height: 2.5rem;
  align-items: center;
  position: relative;

 

  img {
    display: ${(props) => (props.isInProjectHeader ? "none" : "flex")};
    position: absolute;
    top: 5;
    right: 1rem;
    z-index: 2;
  }
`;

export const Input = styled.input<InputProps>`
  display: inline-block;
  height: 100%;
  max-width: 100%;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: ${(props) =>
    props.isLastRow ? `${theme.COLORS.SELECT_INPUT}` : "transparent"};

  border: none;
  outline: none;
  z-index: 1;
  font-size: 1rem;
  font-weight: 600;

  @media(min-width: 1024px){
    font-size: 1.2rem
  }



  &::placeholder {
    color: ${theme.COLORS.GRAY};
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
