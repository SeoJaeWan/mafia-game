import Layout from "@/styles/layout";
import GameBoardStyle from "./gameBoard.style";
import Card from "@/components/atoms/room/card";
import AnimationHelper from "@/components/molecules/room/animationHelper";
import Submit from "@/components/atoms/room/submit";
import Timer from "@/components/atoms/room/timer";
import useGame from "@/hooks/game/useGame";
import { useState } from "react";

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
  const { turn, player, playerList, deadPlayerList } = useGame();
  const [selected, setSelected] = useState("");

  const handleClickCard = (name: string) => {
    if (name !== player!.name) {
      const isSelectAble = selectAble.find(
        (item) => item.turn === turn && item.role === player!.role
      );

      if (turn === "citizenVote" || isSelectAble) {
        setSelected!(name);
      }
    }
  };

  return (
    <GameBoardStyle.Container $time={"night"}>
      <AnimationHelper key={turn} />

      <Timer />
      <GameBoardStyle.PlayBoard $isAnimationFinish={true}>
        <Layout>
          <GameBoardStyle.Text>생존자</GameBoardStyle.Text>
          <Layout position={"relative"}>
            <GameBoardStyle.CardList>
              {playerList.map(({ name, color }, idx) => (
                <GameBoardStyle.Selector
                  key={idx}
                  onClick={() => handleClickCard(name)}
                >
                  <Card
                    name={name}
                    color={color}
                    showAnimation
                    isButton
                    selected={selected}
                    //
                    setSelected={setSelected}
                  />
                </GameBoardStyle.Selector>
              ))}
            </GameBoardStyle.CardList>
          </Layout>
        </Layout>
        {deadPlayerList.length !== 0 && (
          <Layout>
            <GameBoardStyle.Text>사망자</GameBoardStyle.Text>
            <GameBoardStyle.CardList>
              {deadPlayerList.map(({ name, color }, idx) => (
                <Card key={idx} name={name} color={color} showAnimation />
              ))}
            </GameBoardStyle.CardList>
          </Layout>
        )}

        <Submit selected={selected} />
      </GameBoardStyle.PlayBoard>
    </GameBoardStyle.Container>
  );
};

export default GameBoard;
