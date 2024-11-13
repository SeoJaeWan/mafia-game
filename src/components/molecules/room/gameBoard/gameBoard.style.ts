import toRem from "@/styles/utils/toRem";
import styled, { css, keyframes } from "styled-components";

const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: ${toRem(30)};

  width: 100%;
  height: 100%;

  padding: ${toRem(20)};

  overflow-y: auto;
`;

const Text = styled.p`
  margin-bottom: ${toRem(10)};

  font-size: ${toRem(20)};
  font-weight: 800;
`;

const cardAnimation = (length: number, total: number) => keyframes`
  0% {
    transform: translate3d(-50%, ${`calc(-50% - ${
      total * 10 - length * 10
    }px)`}, ${length * 10}px);
  }

  10% {

  }

  100% {
  position: relative;
  top: initial;
  left: initial;
  transform: none;
  }
`;

interface ICardListProps {
  $length: number;
}

const CardAnimation = styled.div<ICardListProps>`
  position: absolute;
  top: 0;
  left: 0;

  z-index: 1;

  display: flex;
  flex-wrap: wrap;
  gap: ${toRem(10)};

  width: 100%;
  height: 100%;

  & > div {
    position: absolute;
    top: 50%;
    left: 50%;
    ${(props) =>
      Array(props.$length)
        .fill(0)
        .map(
          (_, i) => css`
            &:nth-child(${i + 1}) {
              transform: ${`translate3d(
                -50%,
                ${`calc(-50% - ${props.$length * 10 - (i + 1) * 10}px)`},
                ${(i + 1) * 10}px
              )`};
              animation: ${cardAnimation(i + 1, props.$length)} 1s ease-in-out
                ${i * 0.1}s forwards;
            }
          `
        )}
  }
`;

const CardList = styled.div<ICardListProps>`
  display: flex;
  flex-wrap: wrap;
  gap: ${toRem(10)};

  opacity: 0;
`;

const GameBoardStyle = {
  Container,
  Text,
  CardList,
  CardAnimation,
};

export default GameBoardStyle;
