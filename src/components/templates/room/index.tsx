"use client";

import Layout from "@/styles/layout";
import { headerHeight } from "../header";
import Chat from "@/components/organisms/room/chat";
import { useEffect } from "react";
import useGame from "@/hooks/useGame";
import GameBoard from "@/components/organisms/room/gameBoard";
import WaitingBoard from "@/components/organisms/room/waitingBoard";

const GameTemplate = () => {
  const { isPlaying, leaveRoom } = useGame();

  const beforeUnloadListener = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    return (e.returnValue = true);
  };

  const handlePopState = (e: PopStateEvent) => {
    const confirmation = confirm("게임을 떠나시겠습니까?");
    if (confirmation) {
      history.back();
    } else {
      history.pushState(null, "", "");
    }
  };

  // 테스트
  useEffect(() => {
    history.pushState(null, "", "");

    window.addEventListener("beforeunload", beforeUnloadListener);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadListener);
      window.removeEventListener("popstate", handlePopState);
      leaveRoom();
    };
  }, []);

  return (
    <Layout
      display={"flex"}
      flexDirection={"row"}
      //
      width={"100%"}
      height={"100%"}
      //
      paddingTop={headerHeight}
    >
      <Layout width={"70%"} height={"100%"}>
        {/* 테스트 */}
        {isPlaying ? <GameBoard /> : <WaitingBoard />}
      </Layout>
      <Layout width={"30%"} height={"100%"}>
        <Chat />
      </Layout>
    </Layout>
  );
};

export default GameTemplate;
