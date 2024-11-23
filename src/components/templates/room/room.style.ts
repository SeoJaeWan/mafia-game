import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;

  width: 100vw;
  height: 100vh;

  padding-top: 50px;

  @media (max-width: 1070px) {
    flex-direction: column;
  }
`;

const PlayingBoard = styled.div`
  flex-grow: 1;
`;

const ChatBoard = styled.div`
  width: 400px;

  @media (max-width: 1070px) {
    position: relative;
    width: 100%;
  }
`;

const RoomStyle = {
  Container,
  PlayingBoard,
  ChatBoard,
};

export default RoomStyle;
