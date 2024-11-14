import Layout from "@/styles/layout";
import GameBoardStyle from "./gameBoard.style";
import Card from "@/components/atoms/common/card";
import useGame from "@/hooks/useGame";
import { IPlayers } from "@/hooks/useGame/usePlayers";
import PlayHelper from "@/components/molecules/room/playHelper";

type Reduce = [IPlayers[], IPlayers[]];

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
      <PlayHelper />
      <Layout>
        <GameBoardStyle.Text>생존자</GameBoardStyle.Text>
        <Layout position={"relative"}>
          <GameBoardStyle.CardList>
            {survivors.map(({ name, color }, idx) => (
              <Card key={idx} name={name} color={color} showAnimation />
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
    </GameBoardStyle.Container>
  );
};

export default GameBoard;
