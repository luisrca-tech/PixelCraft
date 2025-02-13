import { ClerkProvider } from "@clerk/nextjs";
import { Provider } from "jotai";
import { type Metadata } from "next";
import { type ReactNode } from "react";
import { Toaster } from "sonner";
import { roboto } from "~/assets/fonts/fonts";
import FullScreenLoading from "~/components/widgets/FullScreenLoading";
import { globalStyle } from "~/styles/global";
import { TRPCReactProvider } from "~/trpc/react";
import ogImage from "/public/og-image.png";

export const metadata: Metadata = {
  title: "PixelCraft",
  description:
    "PixelCraft é uma solução avançada de gestão de RH desenvolvida em parceria com a T10, com o objetivo de otimizar o gerenciamento de horas e orçamento de projetos para os funcionários.",
  icons: [{ rel: "icon", url: "/favicon.png" }],
  metadataBase: new URL("https://pixelcraft10.vercel.app"),
  openGraph: {
    images: [
      {
        url: ogImage.src,
        width: 1200,
        height: 630,
        alt: "PixelCraft",
        type: "image/png",
      },
      {
        url: ogImage.src,
        width: 800,
        height: 420,
        alt: "PixelCraft",
        type: "image/png",
      },
      {
        url: ogImage.src,
        width: 600,
        height: 336,
        alt: "PixelCraft",
        type: "image/png",
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
