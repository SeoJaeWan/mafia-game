"use client";

import EnterTemplate from "@/components/templates/enter";
import useGame from "@/hooks/useGame";
import { Metadata } from "next";
import { useParams } from "next/navigation";

export const metadata: Metadata = {
  title: "마피아 게임 - 방 참가",
  description: "마피아 게임 초대가 왔어요.",
  keywords: "마피아, 게임, 마피아게임, 경찰, 의사, 시민, 마피아",

  openGraph: {
    title: "마피아 게임",
    description: "마피아 게임 초대가 왔어요.",
    type: "website",
    locale: "ko_KR",
  },
};

const Join = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { joinRoom } = useGame();

  return <EnterTemplate roomId={roomId} type={"join"} enterRoom={joinRoom} />;
};

export default Join;
