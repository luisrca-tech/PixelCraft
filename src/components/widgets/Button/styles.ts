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
    height: 2.5rem;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    padding: 0px 20px;
    transition: background 0.4s ease-in-out, box-shadow 0.3s ease-in-out;
    background: linear-gradient(
      135deg,
      ${theme.COLORS.PRIMARY},
      ${theme.COLORS.PRIMARY}
    );

    > span {
      color: ${theme.COLORS.WHITE};
    }

    @media (min-width: 1024px) {
      font-size: 1.2rem;
    }

    &:hover {
      background: linear-gradient(
        135deg,
        ${darken(0.1, theme.COLORS.PRIMARY)},
        ${darken(0.05, theme.COLORS.PRIMARY)}
      );
      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    }

    &.loading {
      background: ${darken(0.03, theme.COLORS.SECONDARY_EXTRA_LIGTH)};
      color: ${theme.COLORS.GRAY};
      cursor: not-allowed;
      opacity: 0.9;
    }
  }
`;
