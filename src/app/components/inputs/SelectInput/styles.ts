import { theme } from "~/app/styles/theme";
import { styled } from "@linaria/react";

type ContainerProps = {
  checked: boolean;
  isInProjectHeader: boolean;
};

type InputProps = {
  hasValue: Boolean;
  showError: boolean;
};

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div<ContainerProps>`
  display: flex;
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
  padding-left: 0.75rem;
  height: 100%;
  max-width: 100%;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: ${(props) =>
    props.hasValue ? "transparent" : `${theme.COLORS.SELECT_INPUT}`};
  border-radius: 60px;
  border: ${(props) =>
    props.showError ? `1px solid ${theme.COLORS.ERROR}` : `none`};
  outline: none;
  z-index: 1;
  font-size: 1rem;

  &::placeholder {
    color: ${theme.COLORS.GRAY};
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
