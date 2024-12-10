import localFont from "next/font/local";
import StyledComponentsRegistry from "@/styles/lib/registry";
import { NotiProvoder } from "@/components/atoms/common/noti";
import createMeta from "@/utils/createMeta";

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

export const metadata = createMeta({
  description: "마피아 게임을 즐겨보세요.",
});

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
