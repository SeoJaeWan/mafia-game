import Layout from "@/styles/layout";
import GameBoardStyle from "./gameBoard.style";
import Card from "@/components/atoms/common/card";
import useGame from "@/hooks/useGame";
import AnimationHelper from "@/components/molecules/room/animationHelper";
import Submit from "@/components/atoms/room/submit";
import { IPlayer } from "@/hooks/useGame/useRoom";
import Timer from "@/components/atoms/room/timer";

type Reduce = [IPlayer[], IPlayer[]];

const GameBoard = () => {
  const { players, time } = useGame();

  const [survivors, dead] = players.reduce(
    (acc: Reduce, player) => {
      if (!player.isDie) {
        acc[0].push(player);
      } else {
        acc[1].push(player);
      }

      return acc;
    },
    [[], []]
  );

  return (
    <GameBoardStyle.Container $time={time}>
      <AnimationHelper />
      <Timer />
      <Layout>
        <GameBoardStyle.Text>생존자</GameBoardStyle.Text>
        <Layout position={"relative"}>
          <GameBoardStyle.CardList>
            {survivors.map(({ name, color }, idx) => (
              <Card
                key={idx}
                name={name}
                color={color}
                showAnimation
                isButton
              />
            ))}
          </GameBoardStyle.CardList>
        </Layout>
      </Layout>
      {dead.length !== 0 && (
        <Layout>
          <GameBoardStyle.Text>사망자</GameBoardStyle.Text>
          <GameBoardStyle.CardList>
            {dead.map(({ name, color }, idx) => (
              <Card key={idx} name={name} color={color} showAnimation />
            ))}
          </GameBoardStyle.CardList>
        </Layout>
      )}

      <Submit />
    </GameBoardStyle.Container>
  );
};

export default GameBoard;
