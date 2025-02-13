import { theme } from "~/app/styles/theme";
import { styled } from "@linaria/react";
import { darken } from "polished";

type ContainerProps = {
  checked: boolean;
  isInProjectHeader?: boolean;
};

type InputProps = {
  showError: boolean;
  isLastRow?: boolean;
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.checked ? "calc(100% - 28px)" : "100%")};
  height: 2.5rem;
  align-items: center;
  position: relative;

  border-radius: 60px;

  img {
    display: ${(props) => (props.isInProjectHeader ? "none" : "flex")};
    position: absolute;
    top: 5;
    right: 1rem;
    z-index: 2;
  }
`;

export const Input = styled.input<InputProps>`
   @media(min-width: 1024px){
    font-size: 1.2rem
  }
  
  text-align: center;
  display: inline-block;
  padding-left: 0.75rem;
  height: 100%;
  max-width: 100%;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 60px;
  border: ${(props) =>
    props.showError ? `2px solid ${darken(0.3, theme.COLORS.ERROR)}` : `none`};
  outline: none;
  z-index: 1;
  font-size: 1rem;
  background-color: ${(props) =>
    props.isLastRow
      ? `${theme.COLORS.SELECT_INPUT}`
      : props.showError
        ? `${theme.COLORS.SELECT_INPUT}`
        : "transparent"};

  &::placeholder {
    color: ${theme.COLORS.GRAY};
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
