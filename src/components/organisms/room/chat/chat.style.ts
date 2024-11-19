import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  border-left: 2px solid var(--gray-background-active-rgba);
`;

const UserBox = styled.div`
  height: 35px;
`;

const ChattingBox = styled.div`
  flex: 1;

  width: 100%;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 60px;

  border-top: 2px solid var(--gray-background-active-rgba);
`;

const ChatStyle = {
  Container,
  UserBox,
  ChattingBox,
  InputBox,
};

export default ChatStyle;
