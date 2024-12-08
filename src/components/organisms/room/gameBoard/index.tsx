import GameBoardStyle from "./gameBoard.style";
import AnimationHelper, {
  DayAnimationDuration,
} from "@/components/molecules/room/animationHelper";
import Submit from "@/components/atoms/room/submit";
import Timer from "@/components/atoms/room/timer";
import useGame from "@/hooks/useGame";
import { Fragment, useEffect, useState } from "react";
import Player from "@/components/molecules/room/player";
import Fire from "@/components/atoms/room/fire";
import SystemMessage from "@/components/atoms/room/systemMessage";

const line = [2, 3, 3, 3, 2];

const GameBoard = () => {
  const { turn, timePeriod, playerList, isPlaying } = useGame();
  const [selected, setSelected] = useState("");

  const boardPlayer = [...playerList];
  const gameBoard = new Array(11).fill(0).reduce(
    (acc, _, idx) => {
      const currentLine = line[acc.length - 1];
      const currentArray = acc[acc.length - 1];
      const index = currentArray.length;

      if (
        (index === 0 || index === currentLine - 1) &&
        boardPlayer.length !== 0
      ) {
        const currentPlayer = boardPlayer.shift()!;

        currentArray.push(
          <GameBoardStyle.Selector $isPlaying={isPlaying}>
            <Player
              name={currentPlayer.name}
              color={currentPlayer.color}
              role={currentPlayer.role}
              alive={currentPlayer.alive}
              selected={selected}
              //
              setSelected={setSelected}
            />
          </GameBoardStyle.Selector>
        );
      } else if (idx === 6) {
        currentArray.push(
          <GameBoardStyle.Fire $isPlaying={isPlaying}>
            <Fire />
          </GameBoardStyle.Fire>
        );
      } else {
        currentArray.push(<GameBoardStyle.Block $isPlaying={isPlaying} />);
      }

      if (idx !== 12 && currentArray.length === currentLine) {
        acc.push([]);
      }

      return acc;
    },

    [[] as JSX.Element[]] as JSX.Element[][]
  ) as JSX.Element[][];

  useEffect(() => {
    setSelected("");
  }, [turn]);

  return (
    <GameBoardStyle.Container
      $timePeriod={timePeriod}
      $duration={DayAnimationDuration}
    >
      <AnimationHelper key={turn} />

      <SystemMessage />

      <Timer />
      <GameBoardStyle.PlayBoard>
        {gameBoard.map((line, idx) => (
          <GameBoardStyle.Line key={idx} $isPlaying={isPlaying}>
            {line.map((block, idx) => (
              <Fragment key={idx}>{block}</Fragment>
            ))}
          </GameBoardStyle.Line>
        ))}

        <Submit selected={selected} />
      </GameBoardStyle.PlayBoard>
    </GameBoardStyle.Container>
  );
};

export default GameBoard;
