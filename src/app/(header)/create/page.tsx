"use client";

import EnterTemplate from "@/components/templates/enter";
import useGame from "@/hooks/game/useGame";
import createRoomId from "@/utils/createRoomId";

const Create = () => {
  const roomId = createRoomId();
  const { createRoom } = useGame();

  return (
    <EnterTemplate roomId={roomId} type={"create"} enterRoom={createRoom} />
  );
};

export default Create;
