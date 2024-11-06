"use client";
import PlayBoardStyle from "./playBoard.style";
import GameBoard from "@/components/molecules/game/gameBoard";

const PlayBoard = () => {
  return (
    <PlayBoardStyle.Container>
      <GameBoard />
    </PlayBoardStyle.Container>
  );
};

export default PlayBoard;
