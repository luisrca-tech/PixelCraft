import { theme } from "~/app/styles/theme";
import { styled } from "@linaria/react";
import "@radix-ui/colors/black-alpha.css";

export const Container = styled.div`
  width: 52px;
  height: 28px;
  cursor: pointer;
  button {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    border: none;
  }

  .SwitchRoot {
    width: 52px;
    height: 28px;
    background-color: ${theme.COLORS.LIGHT};
    border-radius: 9999px;
    border: 2px solid ${theme.COLORS.GRAY};

    position: relative;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .SwitchRoot[data-state="checked"] {
    background-color: ${theme.COLORS.PRIMARY};
    border: none;
  }

  .SwitchThumb {
    display: block;
    width: 16px;
    height: 16px;
    background-color: ${theme.COLORS.GRAY};
    border-radius: 9999px;
    box-shadow: 0 2px 2px var(--black-a7);
    transition: transform 300ms;
    transform: translateX(6px);
    will-change: transform;
  }
  .SwitchThumb[data-state="checked"] {
    transform: translateX(22px);
    background-color: ${theme.COLORS.WHITE};
    width: 24px;
    height: 24px;
  }

  .Label {
    color: white;
    font-size: 15px;
    line-height: 1;
  }
`;

export const SwitchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 14px;
    font-weight: 600;

    
  @media(min-width: 1024px){
    font-size: 1rem;
  }
  }
`;
