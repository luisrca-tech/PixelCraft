import { theme } from "~/app/styles/theme";
import { styled } from "@linaria/react";
import { darken } from "polished";

type ContainerType = {
  disabled?: boolean;
};

export const Container = styled.div<ContainerType>`
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  > button {
    opacity: ${(props) => (props.disabled ? "0.5" : "1")};
    pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: ${theme.COLORS.PRIMARY};
    height: 2.5rem;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    padding: 0px 20px;
    color: ${theme.COLORS.WHITE};

    @media(min-width: 1024px){
      font-size: 1.2rem;
    }

    &.loading {
      background-color: ${darken(0.03, theme.COLORS.SECONDARY_EXTRA_LIGTH)};
      color: ${theme.COLORS.GRAY};
      cursor: not-allowed;
      opacity: 0.9;
    }
  }
`;
