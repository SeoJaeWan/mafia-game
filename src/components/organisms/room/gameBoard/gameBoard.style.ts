import { Time } from "@/hooks/useGame/useRoom";
import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

interface IContainer {
  $time: Time;
}

const Container = styled.div<IContainer>`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: ${toRem(30)};

  width: 100%;
  height: 100%;

  padding: ${toRem(20)};

  overflow-y: auto;

  background-color: ${(props) =>
    props.$time === "night"
      ? "var(--day-background-night)"
      : "var(--day-background-morning)"};
`;

const Text = styled.p`
  margin-bottom: ${toRem(10)};

  font-size: ${toRem(20)};
  font-weight: 800;
`;

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${toRem(10)};
`;

const GameBoardStyle = {
  Container,
  Text,
  CardList,
};

export default GameBoardStyle;