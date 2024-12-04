import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;

  width: 50px;
  height: 50px;
`;

const ChatToggleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;

  border: 3px solid var(--white);
  border-radius: 10px;
  background-color: var(--black);

  padding-right: 1px;

  svg {
    color: var(--white);
  }
`;

interface ChatBoxProps {
  $open: boolean;
}

const ChatBox = styled.div<ChatBoxProps>`
  position: fixed;
  bottom: 80px;
  right: 20px;

  display: ${({ $open }) => ($open ? "flex" : "none")};
  flex-direction: column;

  width: calc(100vw - 40px);
  max-width: 400px;

  height: 60vh;

  border: 2px solid var(--gray-background-active-rgba);

  background-color: var(--white);
`;

const ChattingBox = styled.div`
  width: 100%;
  height: calc(100% - 60px);
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
  ChatToggleButton,
  ChatBox,
  ChattingBox,
  InputBox,
};

export default ChatStyle;
