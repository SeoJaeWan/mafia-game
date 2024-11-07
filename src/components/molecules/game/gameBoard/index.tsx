import Layout from "@/styles/layout";
import GameBoardStyle from "./gameBoard.style";
import Card from "@/components/atoms/common/card";

const GameBoard = () => {
  return (
    <GameBoardStyle.Container>
      <Layout>
        <GameBoardStyle.Text>생존자</GameBoardStyle.Text>
        <GameBoardStyle.CardList></GameBoardStyle.CardList>
      </Layout>
      <Layout>
        <GameBoardStyle.Text>사망자</GameBoardStyle.Text>
        <GameBoardStyle.CardList>
          <Card
            width={150}
            color={`#${Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0")}`}
          />
          <Card
            width={150}
            color={`#${Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0")}`}
          />
          <Card
            width={150}
            color={`#${Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0")}`}
          />
          <Card
            width={150}
            color={`#${Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0")}`}
          />
          <Card
            width={150}
            color={`#${Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0")}`}
          />
          <Card
            width={150}
            color={`#${Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0")}`}
          />
          <Card
            width={150}
            color={`#${Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0")}`}
          />
          <Card
            width={150}
            color={`#${Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0")}`}
          />
        </GameBoardStyle.CardList>
      </Layout>
    </GameBoardStyle.Container>
  );
};

export default GameBoard;
