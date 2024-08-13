import { auth } from "@clerk/nextjs/server";
import { styled } from "@linaria/react";
import { type ReactNode } from "react";
import { Toaster } from "sonner";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

type AuthHeaderProps = {
  children: ReactNode;
};

export default function PrivateLayout({ children }: AuthHeaderProps) {
  auth().protect({
    unauthenticatedUrl: "/painel-administrativo/autenticacao/login",
    unauthorizedUrl: "/",
  });

  return (
    <>
      <Toaster richColors />
      <Container>{children}</Container>
    </>
  );
}
