import Layout from "@/styles/layout";
import GameBoardStyle from "./gameBoard.style";
import Card from "@/components/atoms/room/card";
import AnimationHelper from "@/components/molecules/room/animationHelper";
import Submit from "@/components/atoms/room/submit";
import Timer from "@/components/atoms/room/timer";
import { useRoom } from "@/hooks/game/hooks/room/useRoom";
import useGame, { Player } from "@/hooks/game/useGame";

type Reduce = [Player[], Player[]];

const GameBoard = () => {
  const { playerStatuses, time, events } = useRoom();
  const { players } = useGame();

  const isAnimationFinish = events.length === 0;

  const [survivors, dead] = players.reduce(
    (acc: Reduce, player, idx) => {
      const status = playerStatuses[idx];

      if (!status.isDie) {
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
      <GameBoardStyle.PlayBoard $isAnimationFinish={isAnimationFinish}>
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
      </GameBoardStyle.PlayBoard>
    </GameBoardStyle.Container>
  );
};

export default GameBoard;
