import { styled } from "@linaria/react";
import { darken } from "polished";
import { theme } from "~/app/styles/theme";

type InputDataMenuProps = {
  isRangeInThisRow?: boolean;
  isLastRow?: boolean;
};

export const Container = styled.button<InputDataMenuProps>`
  background: ${theme.COLORS.SELECT_INPUT};
  color: ${theme.COLORS.SECONDARY_DARK};
  font-size: 1rem;
  border: ${(props) =>
    props.isRangeInThisRow
      ? "none"
      : `1px solid ${darken(0.5, theme.COLORS.ERROR)}`};
  padding: 0 0.5rem;
  height: 2.5rem;
  border-radius: 60px;

  display: flex;
  align-items: center;
  gap: 0.5rem;

 


`;
