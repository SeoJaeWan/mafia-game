import CardStyle from "@/components/atoms/room/card/card.style";
import { Time } from "@/hooks/game/hooks/room/useGameState";
import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

interface IContainer {
  $time: Time;
}

const Text = styled.p`
  margin-bottom: 20px;

  font-size: ${toRem(20)};
  font-weight: 800;
`;

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

interface IPlayBoard {
  $isAnimationFinish: boolean;
}

const PlayBoard = styled.div<IPlayBoard>`
  display: ${(props) => (props.$isAnimationFinish ? "block" : "none")};

  width: 100%;
  height: 100%;
`;

const Container = styled.div<IContainer>`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 30px;

  width: 100%;
  height: 100%;

  padding: 20px;

  overflow-y: auto;

  background-color: ${(props) =>
    props.$time === "night"
      ? "var(--day-background-night)"
      : "var(--day-background-morning)"};

  ${Text} {
    color: ${(props) =>
      props.$time === "night"
        ? "var(--day-background-morning)"
        : "var(--day-background-night)"};
  }
`;

const Selector = styled.button`
  background-color: transparent;
  border: none;

  width: 150px;
  height: auto;
  aspect-ratio: 63/88;

  @media (max-width: 768px) {
    width: calc((100% - 20px) / 2);
  }

  ${CardStyle.Container} {
    width: 100%;
    height: 100%;

    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

const GameBoardStyle = {
  Container,
  Text,
  CardList,
  PlayBoard,
  Selector,
};

export default GameBoardStyle;
