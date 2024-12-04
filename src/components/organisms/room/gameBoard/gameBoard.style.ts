import CardStyle from "@/components/atoms/room/player/player.style";
import { timePeriod } from "@/hooks/useGame";
import styled from "styled-components";

const PlayBoard = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  align-items: flex-end;

  width: 100%;
  height: 100%;
`;

interface IContainer {
  $timePeriod: timePeriod;
}

const Container = styled.div<IContainer>`
  position: relative;
  flex-grow: 1;

  width: 100%;

  padding: 20px;
  padding-bottom: 80px;

  overflow-y: auto;

  background-color: ${(props) =>
    props.$timePeriod === "night"
      ? "var(--day-background-night)"
      : "var(--day-background-morning)"};
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
  PlayBoard,
  Selector,
};

export default GameBoardStyle;
