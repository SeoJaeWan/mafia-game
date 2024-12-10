"use client";

import Chat from "@/components/organisms/room/chat";
import GameBoard from "@/components/organisms/room/gameBoard";
import InviteLink from "@/components/organisms/room/inviteLink";
import RoomStyle from "./room.style";
import useGame from "@/hooks/useGame";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import Players from "@/components/organisms/room/players";
import InputForm from "@/components/organisms/room/inputForm";
import { useNoti } from "@/components/atoms/common/noti";

const GameTemplate = () => {
  const { socket, gameLeave } = useGame();
  const { addNoti } = useNoti();

  useEffect(() => {
    if (!socket) {
      addNoti("잘못된 접근입니다.", "error");
      redirect("/");
    }
  }, [socket, addNoti]);

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
      <Players />
      <GameBoard />
      <InviteLink />
      <Chat />

      <InputForm />
    </RoomStyle.Container>
  );
};

export default GameTemplate;
