"use client";

import Chat from "@/components/organisms/room/chat";
import GameBoard from "@/components/organisms/room/gameBoard";
import WaitingBoard from "@/components/organisms/room/waitingBoard";
import RoomStyle from "./room.style";
import useGame from "@/hooks/game/useGame";

const GameTemplate = () => {
  const { isPlaying } = useGame();

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
  // useEffect(() => {
  //   history.pushState(null, "", "");

  //   window.addEventListener("beforeunload", beforeUnloadListener);
  //   window.addEventListener("popstate", handlePopState);

  //   return () => {
  //     window.removeEventListener("beforeunload", beforeUnloadListener);
  //     window.removeEventListener("popstate", handlePopState);
  //     game.leaveRoom();
  //   };
  // }, []);

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
