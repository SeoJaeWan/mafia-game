import Layout from "@/styles/layout";
import GameBoardStyle from "./gameBoard.style";
import Card from "@/components/atoms/room/card";
import AnimationHelper from "@/components/molecules/room/animationHelper";
import Submit from "@/components/atoms/room/submit";
import Timer from "@/components/atoms/room/timer";
import useGame from "@/hooks/game/useGame";

const GameBoard = () => {
  const { turn, playerList, deadPlayerList } = useGame();

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

        {/* <Submit /> */}
      </GameBoardStyle.PlayBoard>
    </GameBoardStyle.Container>
  );
};

export default GameBoard;
