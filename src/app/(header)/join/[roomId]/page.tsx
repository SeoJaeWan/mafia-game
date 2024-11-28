"use client";

import EnterTemplate from "@/components/templates/enter";
import useGame from "@/hooks/game/useGame";
import { useParams } from "next/navigation";

const Join = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { joinRoom } = useGame();

  return <EnterTemplate roomId={roomId} type={"join"} enterRoom={joinRoom} />;
};

export default Join;
