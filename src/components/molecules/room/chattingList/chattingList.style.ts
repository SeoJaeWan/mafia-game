import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${toRem(10)};

  padding: ${toRem(10)};

  overflow-y: auto;
`;

const ChattingStyle = {
  Container,
};

export default ChattingStyle;
