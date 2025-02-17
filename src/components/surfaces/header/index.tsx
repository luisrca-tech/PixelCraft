"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IoAdd, IoCloseSharp, IoMenu, IoArrowBackSharp } from "react-icons/io5";
import Modal from "../Modal";
import {
  AddProjectButton,
  ButtonContainer,
  ButtonsContainer,
  CloseContainer,
  Container,
  MenuButton,
  NavLink,
  NavigationContainer,
  OptionsContainer,
  SidebarContainer,
  TitleContainer,
  BackButton,
} from "./styles";

import { UserButton } from "@clerk/nextjs";
import { poppins } from "~/assets/fonts/fonts";

export default function Header() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const router = useRouter();
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");

  const isAuthPage = currentPath.startsWith("/autenticacao");
  const isPersonsPage = currentPath.startsWith("/pessoas");
  const isProjectsPage = currentPath.startsWith("/projetos");

  if (isAuthPage) {
    return (
      <Container isAutentication={true}>
        <TitleContainer className={poppins.className}>
          <h1>Pixel Craft</h1>
        </TitleContainer>
      </Container>
    );
  }

  return (
    <>
      {showModal && <Modal onClickCallback={() => setShowModal(false)} />}
      <SidebarContainer isShow={showModal}>
        <UserButton userProfileMode="navigation" userProfileUrl="" />
        <CloseContainer>
          <button onClick={() => setShowModal(false)}>
            <span className={poppins.className}>Fechar</span>
            <IoCloseSharp size={24} />
          </button>
        </CloseContainer>
        <OptionsContainer>
          <ButtonContainer>
            <button
              onClick={() => {
                router.push("/projetos");
                setShowModal(false);
              }}
              className={poppins.className}
            >
              Projetos
            </button>
          </ButtonContainer>

          <ButtonContainer>
            <button
              onClick={() => {
                router.push("/configuracao");
                setShowModal(false);
              }}
              className={poppins.className}
            >
              Configuração
            </button>
          </ButtonContainer>

          <ButtonContainer disabled>
            <button className={poppins.className}>Mobilizados</button>
          </ButtonContainer>
          <ButtonContainer disabled>
            <button className={poppins.className}>Férias</button>
          </ButtonContainer>
        </OptionsContainer>
      </SidebarContainer>

      <Container isAutentication={false}>
        <ButtonsContainer className="mobile-only">
          <MenuButton onClick={() => setShowModal(true)}>
            <IoMenu size={24} />
          </MenuButton>
        </ButtonsContainer>

        <BackButton onClick={() => router.back()}>
          <IoArrowBackSharp size={24} stroke="white" />
        </BackButton>

        <TitleContainer className={`${poppins.className} mobile-only`}>
          <h1>
            {isPersonsPage ? "Pessoas" : !projectId ? "Projetos" : "Projeto"}
          </h1>
        </TitleContainer>

        <NavigationContainer>
          <div className="desktop-only">
            <UserButton userProfileMode="navigation" userProfileUrl="" />
          </div>
          <NavLink
            active={isProjectsPage}
            onClick={() => router.push("/projetos")}
            className={poppins.className}
          >
            Projetos
          </NavLink>
          <NavLink
            active={currentPath === "/configuracao"}
            onClick={() => router.push("/configuracao")}
            className={poppins.className}
          >
            Configuração
          </NavLink>
          <NavLink disabled className={poppins.className}>
            Mobilizados
          </NavLink>
          <NavLink disabled className={poppins.className}>
            Férias
          </NavLink>
        </NavigationContainer>

        <ButtonsContainer>
          <AddProjectButton onClick={() => (window.location.href = "/projeto")}>
            <span className={poppins.className}>Novo projeto</span>
            <IoAdd size={24} />
          </AddProjectButton>
        </ButtonsContainer>
      </Container>
    </>
  );
}
