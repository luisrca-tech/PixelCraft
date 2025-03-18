import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

type ContainerProps = {
  checked?: boolean;
};

type InputsRowProps = {
  checked?: boolean;
  offsetX?: number;
  offsetXByRow?: {
    [key: number]: number;
  };
  isLastRow?: boolean;
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  border-radius: 20px;
  justify-content: space-between;
  gap: 1rem;
  background: ${theme.COLORS.LIGHT};
  width: 100%;
  position: relative;
`;

export const DeleteButtonAnimationFrame = styled.button<InputsRowProps>`
  width: 100%;
  height: 100%;
  padding-right: 5px;
  display: ${(props) => (props.isLastRow ? "none" : "flex")};
  align-items: center;
  justify-content: end;
  text-align: center;

  position: absolute;
  bottom: 0;
  right: 0;
  z-index: -1;
  transition: transform 0.5s ease;
  transform: translateX(
    ${(props) =>
    props.isLastRow
      ? props.offsetXByRow && props.offsetX
        ? "0"
        : "0"
      : props.offsetXByRow && props.offsetX
        ? "1.5rem"
        : "0"}
  );

  background: ${theme.COLORS.SECONDARY};
  border-radius: 20px;
  border: 1px solid ${theme.COLORS.WHITE};
  outline: none;
`;

export const DeleteButtonOnDesktop = styled.button`
margin: none;
outline: none;
border: none;
background-color: transparent;
padding-right: 0.75rem;

&:hover{
  transform: scale(1.1);
}

@media(max-width: 1024px){
  display: none;
}


`
