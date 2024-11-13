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
