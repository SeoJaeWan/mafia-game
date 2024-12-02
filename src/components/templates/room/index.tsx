"use client";

import Chat from "@/components/organisms/room/chat";
import GameBoard from "@/components/organisms/room/gameBoard";
import WaitingBoard from "@/components/organisms/room/waitingBoard";
import RoomStyle from "./room.style";
import useGame from "@/hooks/useGame";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const GameTemplate = () => {
  const { socket, isPlaying, gameLeave } = useGame();

  useEffect(() => {
    if (!socket) {
      alert("잘못된 접근입니다.");
      redirect("/");
    }
  }, [socket]);

  useEffect(() => {
    const beforeUnloadListener = (e: BeforeUnloadEvent) => {
      e.preventDefault();

      return (e.returnValue = true);
    };

    const handlePopState = () => {
      const confirmation = confirm("게임을 떠나시겠습니까?");
      if (confirmation) {
        history.back();
        gameLeave();
      } else {
        history.pushState(null, "", "");
      }
    };

    history.pushState(null, "", "");

    window.addEventListener("beforeunload", beforeUnloadListener);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadListener);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [gameLeave]);

  if (!socket) {
    return null;
  }

  return (
    <RoomStyle.Container>
      <RoomStyle.PlayingBoard>
        {/* 테스트 */}
        {isPlaying ? <GameBoard /> : <WaitingBoard />}
      </RoomStyle.PlayingBoard>
      <RoomStyle.ChatBoard>
        <Chat />
      </RoomStyle.ChatBoard>
    </RoomStyle.Container>
  );
};

export default GameTemplate;
