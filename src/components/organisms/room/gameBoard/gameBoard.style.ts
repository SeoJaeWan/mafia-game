import { timePeriod } from "@/hooks/useGame";
import styled, { css } from "styled-components";

interface ContainerProps {
  $timePeriod: timePeriod;
  $duration: number;
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
  transition: background ${(props) => props.$duration}ms;
`;

interface PlayingProps {
  $isPlaying: boolean;
}

const Line = styled.div<PlayingProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  width: 800px;

  ${(props) =>
    !props.$isPlaying &&
    css`
      &:nth-child(1) {
        ${Selector}:nth-of-type(1) {
          bottom: 50px;
          left: 50%;
          transform: translateX(0%);

          z-index: 4;

          @media (max-width: 768px) {
            left: 52%;
          }
        }

        ${Selector}:nth-of-type(2) {
          bottom: 50px;
          left: 50%;
          transform: translateX(-100%);

          z-index: 4;

          @media (max-width: 768px) {
            left: 48%;
          }
        }
      }

      &:nth-child(2) {
        ${Selector}:nth-of-type(1) {
          bottom: 50px;
          left: 50%;
          transform: translateX(100%);

          z-index: 3;

          @media (max-width: 768px) {
            bottom: 100px;
            left: 54%;
          }
        }

        ${Selector}:nth-of-type(2) {
          bottom: 50px;
          left: 50%;
          transform: translateX(-200%);

          z-index: 3;

          @media (max-width: 768px) {
            bottom: 100px;
            left: 46%;
          }
        }
      }

      &:nth-child(3) {
        ${Selector}:nth-of-type(1) {
          bottom: 50px;
          left: 50%;
          transform: translateX(200%);

          z-index: 2;

          @media (max-width: 768px) {
            bottom: 180px;
          }
        }

        ${Selector}:nth-of-type(2) {
          bottom: 50px;
          left: 50%;
          transform: translateX(-300%);

          z-index: 2;

          @media (max-width: 768px) {
            bottom: 180px;
          }
        }
      }

      &:nth-child(4) {
        ${Selector}:nth-of-type(1) {
          bottom: 50px;
          left: 50%;
          transform: translateX(300%);

          z-index: 1;

          @media (max-width: 768px) {
            bottom: 260px;
            left: 20%;
          }
        }

        ${Selector}:nth-of-type(2) {
          bottom: 50px;
          left: 50%;
          transform: translateX(-400%);

          z-index: 1;

          @media (max-width: 768px) {
            bottom: 260px;
            left: 80%;
          }
        }
      }
    `}

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-around;
  }
`;

const Block = styled.span<PlayingProps>`
  display: ${(props) => (props.$isPlaying ? "flex" : "none")};

  justify-content: center;
  align-items: center;

  width: calc(25%);

  @media (max-width: 768px) {
    display: none;
  }
`;

const Fire = styled.span<PlayingProps>`
  display: ${(props) => (props.$isPlaying ? "flex" : "none")};

  justify-content: center;
  align-items: center;

  width: calc(40%);

  @media (max-width: 768px) {
    display: none;
  }
`;

const Selector = styled.div<PlayingProps>`
  position: ${(props) => (props.$isPlaying ? "relative" : "absolute")};

  display: flex;
  justify-content: center;
  align-items: center;

  width: auto;
  height: 100px;

  background-color: transparent;

  transition: transform 0.5s;

  @media (max-width: 768px) {
    height: 73px;
  }
`;

const PlayBoard = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    gap: 20px;
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
