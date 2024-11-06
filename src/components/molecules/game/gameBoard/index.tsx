import Layout from "@/styles/layout";
import GameBoardStyle from "./gameBoard.style";
import toRem from "@/styles/utils/toRem";
import Card from "@/components/atoms/common/card";

const GameBoard = () => {
  return (
    <GameBoardStyle.Container>
      <Layout>
        <GameBoardStyle.Text>생존자</GameBoardStyle.Text>
        <GameBoardStyle.CardList>
          <Card width={150} />
          <Card width={150} />
          <Card width={150} />
          <Card width={150} />
          <Card width={150} />
          <Card width={150} />
          <Card width={150} />
          <Card width={150} />
        </GameBoardStyle.CardList>
      </Layout>
      <Layout>
        <GameBoardStyle.Text>사망자</GameBoardStyle.Text>
        <GameBoardStyle.CardList>
          <Card width={150} />
          <Card width={150} />
          <Card width={150} />
          <Card width={150} />
          <Card width={150} />
          <Card width={150} />
          <Card width={150} />
          <Card width={150} />
        </GameBoardStyle.CardList>
      </Layout>
    </GameBoardStyle.Container>
  );
};

export default GameBoard;
