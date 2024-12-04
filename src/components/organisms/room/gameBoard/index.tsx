import GameBoardStyle from "./gameBoard.style";
import AnimationHelper from "@/components/molecules/room/animationHelper";
import Submit from "@/components/atoms/room/submit";
import Timer from "@/components/atoms/room/timer";
import useGame from "@/hooks/useGame";
import { useEffect, useState } from "react";
import Player from "@/components/atoms/room/player";

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

const GameBoard = () => {
  const { turn, timePeriod, player, playerList, deadPlayerList } = useGame();
  const [selected, setSelected] = useState("");

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

      <Timer />
      <GameBoardStyle.PlayBoard>
        {playerList.map(({ name, color }, idx) => (
          <GameBoardStyle.Selector
            key={idx}
            onClick={() => handleClickPlayer(name)}
          >
            <Player
              name={name}
              color={color}
              selected={selected}
              //
              setSelected={setSelected}
            />
          </GameBoardStyle.Selector>
        ))}

        <Submit selected={selected} />
      </GameBoardStyle.PlayBoard>
    </GameBoardStyle.Container>
  );
};

export default GameBoard;
