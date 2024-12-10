import RoomTemplate from "@/components/templates/room";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "마피아 게임 - 방",
  description: "마피아 게임을 즐겨보세요.",
  keywords: "마피아, 게임, 마피아게임, 경찰, 의사, 시민, 마피아",

  openGraph: {
    title: "마피아 게임",
    description: "마피아 게임을 즐겨보세요.",
    images: {
      url: "/assets/og-image.png",
    },
    type: "website",
    locale: "ko_KR",
  },
};

const Room = () => {
  return <RoomTemplate />;
};

export default Room;
