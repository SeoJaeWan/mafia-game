"use client";

import EnterTemplate from "@/components/templates/enter";
import useGame from "@/hooks/useGame";
import createRoomId from "@/utils/createRoomId";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "마피아 게임 - 방 생성",
  description: "마피아 게임을 즐겨보세요.",
  keywords: "마피아, 게임, 마피아게임, 경찰, 의사, 시민, 마피아",

  openGraph: {
    title: "마피아 게임",
    description: "마피아 게임을 즐겨보세요.",
    type: "website",
    locale: "ko_KR",
  },
};

const Create = () => {
  const roomId = createRoomId();
  const { createRoom } = useGame();

  return (
    <EnterTemplate roomId={roomId} type={"create"} enterRoom={createRoom} />
  );
};

export default Create;
