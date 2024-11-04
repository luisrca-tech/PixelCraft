import { auth } from "@clerk/nextjs/server";
import { styled } from "@linaria/react";
import { type ReactNode } from "react";
import Header from "~/components/surfaces/header";

const Container = styled.div`
  width: 100%;
  overflow-y: hidden;
  padding-bottom: 2px;
`;

type AuthHeaderProps = {
  children: ReactNode;
};

export default function PrivateLayout({ children }: AuthHeaderProps) {
  auth().protect({
    unauthenticatedUrl: "/autenticacao/login",
    unauthorizedUrl: "/",
  });

  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
}
