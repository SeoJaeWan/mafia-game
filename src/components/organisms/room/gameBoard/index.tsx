import GameBoardStyle from "./gameBoard.style";
import AnimationHelper from "@/components/molecules/room/animationHelper";
import Submit from "@/components/atoms/room/submit";
import Timer from "@/components/atoms/room/timer";
import useGame from "@/hooks/useGame";
import { Fragment, useEffect, useState } from "react";
import Player from "@/components/atoms/room/player";
import Fire from "@/components/atoms/room/fire";
import SystemMessage from "@/components/atoms/room/systemMessage";

const selectAble = [
  {
    turn: "mafiaVote",
    role: "mafia",
  },
  {
    turn: "check",
    role: "police",
  },
  {
    turn: "heal",
    role: "doctor",
  },
];

const line = [2, 3, 3, 3, 2];

const GameBoard = () => {
  const { turn, timePeriod, player, playerList, isPlaying } = useGame();
  const [selected, setSelected] = useState("");

  // 2 3 5 3 2
  // 0 1 2 4 5 9 10 12 13 14
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
          <GameBoardStyle.Selector
            onClick={() => handleClickPlayer(currentPlayer.name)}
          >
            <Player
              name={currentPlayer.name}
              color={currentPlayer.color}
              role={currentPlayer.role}
              selected={selected}
              //
              setSelected={setSelected}
            />
          </GameBoardStyle.Selector>
        );
      } else if (idx === 6) {
        currentArray.push(
          <GameBoardStyle.Fire>
            <Fire />
          </GameBoardStyle.Fire>
        );
      } else {
        currentArray.push(<GameBoardStyle.Block />);
      }

      if (idx !== 12 && currentArray.length === currentLine) {
        acc.push([]);
      }

      return acc;
    },

    [[] as JSX.Element[]] as JSX.Element[][]
  ) as JSX.Element[][];

  const handleClickPlayer = (name: string) => {
    if (name !== player!.name) {
      const isSelectAble = selectAble.find(
        (item) => item.turn === turn && item.role === player!.role
      );

      if (turn === "citizenVote" || isSelectAble) {
        setSelected!(name);
      }
    }
  };

  useEffect(() => {
    setSelected("");
  }, [turn]);

  return (
    <GameBoardStyle.Container $timePeriod={timePeriod}>
      <AnimationHelper key={turn} />

      <SystemMessage />

      <Timer />
      <GameBoardStyle.PlayBoard $isPlaying={isPlaying}>
        {gameBoard.map((line, idx) => (
          <GameBoardStyle.Line key={idx}>
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
