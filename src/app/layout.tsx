import type { Metadata } from "next";
import localFont from "next/font/local";
import StyledComponentsRegistry from "@/styles/lib/registry";
import { NotiProvoder } from "@/components/atoms/common/noti";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const anton = localFont({
  src: "./fonts/AntonSCRegular.ttf",
  display: "swap",
  weight: "45 920",
  variable: "--font-anton",
});

export const metadata: Metadata = {
  title: "마피아 게임",
  description: "마피아 게임을 즐겨보세요.",
  keywords: "마피아, 게임, 마피아게임, 경찰, 의사, 시민, 마피아",

  openGraph: {
    title: "마피아 게임",
    description: "마피아 게임을 즐겨보세요.",
    type: "website",
    locale: "ko_KR",
    images: {
      url: "/assets/og-image.png",
    },
    url: "http://mafia-game.seojaewan.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} ${anton.variable}`}>
        <StyledComponentsRegistry>
          <div id="noti" />
          <NotiProvoder>{children}</NotiProvoder>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
