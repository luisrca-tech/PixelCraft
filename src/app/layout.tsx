import { type ReactNode } from "react";
import { Provider } from "jotai";
import { type Metadata } from "next";
import FullScreenLoading from "~/components/widgets/FullScreenLoading";
import { roboto } from "~/assets/fonts/fonts";
import { Toaster } from "sonner";
import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { globalStyle } from "~/styles/global";
import ogImage from "./public/og-image.png"

export const metadata: Metadata = {
  title: "PixelCraft",
  description:
    "PixelCraft é uma solução avançada de gestão de RH desenvolvida em parceria com a T10, com o objetivo de otimizar o gerenciamento de horas e orçamento de projetos para os funcionários.",
  icons: [{ rel: "icon", url: "/favicon.png" }],
   openGraph: {
    images: [
      {
        url: ogImage.src,
        width: 1200,
        height: 630,
        alt: "PixelCraft",
      },
    ],
  },
};

type Props = React.PropsWithChildren;

function JotaiProvider({ children }: Props): JSX.Element {
  return <Provider>{children}</Provider>;
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br" className={globalStyle}>
      <body className={roboto.className}>
        <TRPCReactProvider>
          <JotaiProvider>
            <ClerkProvider>
              <Toaster
                position="bottom-right"
                expand={true}
                richColors
                closeButton
              />
              <FullScreenLoading>{children}</FullScreenLoading>
            </ClerkProvider>
          </JotaiProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
