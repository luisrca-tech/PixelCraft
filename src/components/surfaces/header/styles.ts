import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

type SidebarContainerType = {
  isShow: boolean;
};

type ContainerType = {
  isAutentication: boolean;
};

type NavLinkType = {
  active?: boolean;
  disabled?: boolean;
};

type ButtonContainerType = {
  disabled?: boolean;
};

export const Container = styled.header<ContainerType>`
  width: 100%;
  display: flex;
  max-width: 90rem;
  align-items: center;
  justify-content: ${(props) =>
    props.isAutentication ? "center" : "space-between"};
  height: 6rem;
  position: fixed;
  top: 0;
  gap: 1rem;
  background-color: ${theme.COLORS.WHITE};
  z-index: 3;
  padding: 0 5%;

  @media(min-width: 1600px){
   
   padding: 0 !important;
 }

  .mobile-only {
    @media (min-width: 1024px) {
      display: none;
      overflow: hidden;
      width: 0;
 
    }
  }

  .desktop-only {
    @media (max-width: 1024px) {
      display: none;
      overflow: hidden;
      width: 0;
    }
  }
`;


export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const MenuButton = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const TitleContainer = styled.div`
  height: 4.8rem;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 1.125rem;
    font-weight: 600;
  }
`;

export const NavigationContainer = styled.nav`
  display: none;
  width: 0;
  overflow: hidden;

  @media (min-width: 1024px) {
    display: flex;
    width: auto;
    overflow: visible;
    align-items: center;
    gap: 2rem;
    padding-left: 10px;
  }
`;

export const SidebarContainer = styled.div<SidebarContainerType>`
  padding: 3.75rem 5.625rem 0 1.938rem;
  display: flex;
  width: 66vw;
  flex-direction: column;
  height: 100vh;
  background-color: ${theme.COLORS.WHITE};
  border-radius: 20px 20px;
  z-index: 9999;
  position: fixed;
  left: ${(props) => (props.isShow ? `0` : `-66vw`)};
  top: 0;
  transition: left 0.3s;

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const OptionsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const CloseContainer = styled.div`
  width: 100%;
  padding: 1.5rem 0;
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${theme.COLORS.LIGHT};
  > button {
    width: 100%;
    border: none;
    background-color: transparent;
    display: flex;
    gap: 10px;
    align-items: center;
    cursor: pointer;
    > span {
      color: ${theme.COLORS.PRIMARY};
      font-size: 1rem;
      font-weight: bold;
    }
    > svg {
      color: ${theme.COLORS.PRIMARY};
    }
  }
`;

export const ButtonContainer = styled.div<ButtonContainerType>`
  width: 100%;
  padding: 1.5rem 0;
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${theme.COLORS.LIGHT};
  > button {
    background-color: transparent;
    color: ${theme.COLORS.DARK};
    font-size: 1rem;
    font-weight: 600;
    border: none;
    opacity: ${(props) => (props.disabled ? "0.5" : "1")};
    pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
    cursor: pointer;
  }
`;

export const NavLink = styled.button<NavLinkType>`
  background-color: transparent;
  color: ${theme.COLORS.DARK};
  font-size: 1rem;
  font-weight: 600;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${theme.COLORS.PRIMARY};
    transform: scaleX(${(props) => (props.active ? 1 : 0)});
    transition: transform 0.3s ease;
  }

  &:hover:not(:disabled):after {
    transform: scaleX(1);
  }
`;

export const AddProjectButton = styled.button`
  width: 100%;
  background-color: ${theme.COLORS.PRIMARY};
  height: 2.4rem;
  border: none;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 0px 20px;
  color: ${theme.COLORS.WHITE};
  cursor: pointer;
  transition: transform 0.2s ease;

  >span{
    font-size: 1rem;
    font-weight: 700;
    @media(max-width:700px ){
      display: none;
    }
  }

  &:hover {
    transform: scale(1.1);
  }
`;

export const BackButton = styled.button`
  padding: 0px 20px;
  
  border-radius: 20px;
  height: 2.4rem;
  border-radius: 20px;
  background-color: ${theme.COLORS.PRIMARY};
  border: none;
  transition: transform 0.2s ease;

  display: none;

  @media(min-width: 1024px){
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    transform: scale(1.1);
  }

`
