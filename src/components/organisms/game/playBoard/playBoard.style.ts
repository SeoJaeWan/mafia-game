import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  border-top: ${toRem(2)} solid var(--gray-background-active-rgba);
`;

const PlayBoardStyle = {
  Container,
};

export default PlayBoardStyle;
