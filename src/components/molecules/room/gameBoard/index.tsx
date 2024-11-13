import Layout from "@/styles/layout";
import GameBoardStyle from "./gameBoard.style";
import Card from "@/components/atoms/common/card";

const list = [
  {
    id: 1,
    color: `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`,
  },
  {
    id: 2,
    color: `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`,
  },
  {
    id: 3,
    color: `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`,
  },
  {
    id: 4,
    color: `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`,
  },
  {
    id: 5,
    color: `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`,
  },
  {
    id: 6,
    color: `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`,
  },
  {
    id: 7,
    color: `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`,
  },
  {
    id: 8,
    color: `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`,
  },
];

const GameBoard = () => {
  return (
    <GameBoardStyle.Container>
      <Layout>
        <GameBoardStyle.Text>생존자</GameBoardStyle.Text>
        <Layout position={"relative"}>
          <GameBoardStyle.CardList>
            {list.map(({ id, color }) => (
              <Card key={id} color={color} showAnimation />
            ))}
          </GameBoardStyle.CardList>
        </Layout>
      </Layout>
      <Layout>
        <GameBoardStyle.Text>사망자</GameBoardStyle.Text>
        <GameBoardStyle.CardList>
          {list.map(({ id, color }) => (
            <Card key={id} color={color} />
          ))}
        </GameBoardStyle.CardList>
      </Layout>
    </GameBoardStyle.Container>
  );
};

export default GameBoard;
