import { timePeriod } from "@/hooks/useGame";
import styled, { css } from "styled-components";

interface ContainerProps {
  $timePeriod: timePeriod;
}

const Container = styled.div<ContainerProps>`
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
  transition: background 3s;
`;

const Line = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 800px;
`;

const Block = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  width: calc(25%);
`;

const Fire = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  width: calc(40%);
`;

const Selector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: calc(100% / 5);
  height: auto;
  aspect-ratio: 3/2;

  background-color: transparent;

  transition: transform 0.5s;
`;

interface PlayBoardProps {
  $isPlaying: boolean;
}

const PlayBoard = styled.div<PlayBoardProps>`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  ${Fire},
  ${Block} {
    display: ${(props) => (props.$isPlaying ? "flex" : "none")};

    @media (max-width: 768px) {
      display: none;
    }
  }

  ${(props) =>
    !props.$isPlaying &&
    css`
      ${Line} {
        &:nth-child(1) {
          ${Selector}:nth-of-type(1) {
            bottom: 50px;
            left: 50%;
            transform: translateX(-20%);
          }

          ${Selector}:nth-of-type(2) {
            bottom: 50px;
            left: 50%;
            transform: translateX(-80%);
          }
        }

        &:nth-child(2) {
          ${Selector}:nth-of-type(1) {
            bottom: 50px;
            left: 50%;
            transform: translateX(40%);
          }

          ${Selector}:nth-of-type(2) {
            bottom: 50px;
            left: 50%;
            transform: translateX(-140%);
          }
        }

        &:nth-child(3) {
          ${Selector}:nth-of-type(1) {
            bottom: 50px;
            left: 50%;
            transform: translateX(95%);
          }

          ${Selector}:nth-of-type(2) {
            bottom: 50px;
            left: 50%;
            transform: translateX(-195%);
          }
        }

        &:nth-child(4) {
          ${Selector}:nth-of-type(1) {
            bottom: 50px;
            left: 50%;
            transform: translateX(155%);
          }

          ${Selector}:nth-of-type(2) {
            bottom: 50px;
            left: 50%;
            transform: translateX(-255%);
          }
        }

        &:nth-child(5) {
          ${Selector}:nth-of-type(1) {
            bottom: 50px;
            left: 50%;
            transform: translateX(215%);
          }

          ${Selector}:nth-of-type(2) {
            bottom: 50px;
            left: 50%;
            transform: translateX(-315%);
          }
        }
      }
    `}

  ${Selector} {
    position: ${(props) => (props.$isPlaying ? "relative" : "absolute")};
    width: ${(props) =>
      props.$isPlaying ? "calc(100% / 5)" : "calc(100% / 8)"};
    ${(props) => !props.$isPlaying && `min-width: 110px;`}
  }

  @media (max-width: 768px) {
    gap: 10px;
    justify-content: flex-end;

    padding: 0 0 20px;
  }
`;

const GameBoardStyle = {
  Container,
  PlayBoard,
  Line,
  Block,
  Fire,
  Selector,
};

export default GameBoardStyle;
