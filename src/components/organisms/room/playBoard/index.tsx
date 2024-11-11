"use client";
import useGame from "@/hooks/useGame";
import PlayBoardStyle from "./playBoard.style";
import GameBoard from "@/components/molecules/room/gameBoard";
import WaitingBoard from "@/components/molecules/room/waitingBoard";

const PlayBoard = () => {
  const { isPlaying } = useGame();

  return (
    <PlayBoardStyle.Container>
      {isPlaying ? <GameBoard /> : <WaitingBoard />}
    </PlayBoardStyle.Container>
  );
};

export default PlayBoard;
