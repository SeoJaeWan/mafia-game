import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

const Container = styled.div`
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
