import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;

  border-left: 2px solid var(--gray-background-active-rgba);
  box-shadow: -24px 0px 20px -24px rgba(0, 0, 0, 0.1);
`;

const ChattingBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${toRem(10)};

  width: 100%;
  height: calc(100% - ${toRem(35)} - ${toRem(60)});

  padding: 0 ${toRem(10)};

  overflow-y: auto;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: ${toRem(60)};

  padding: 0 ${toRem(10)};

  border-top: ${toRem(2)} solid var(--gray-background-active-rgba);
`;

const ChatStyle = {
  Container,
  ChattingBox,
  InputBox,
};

export default ChatStyle;
