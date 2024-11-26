import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;

  @media (max-width: 1070px) {
    position: absolute;
    bottom: 20px;
    right: 20px;

    width: 50px;
    height: 50px;
  }
`;

const ChatToggleButton = styled.button`
  display: none;

  width: 50px;
  height: 50px;

  border: 3px solid var(--white);
  border-radius: 10px;
  background-color: var(--black);

  padding-right: 1px;

  svg {
    color: var(--white);
  }

  @media (max-width: 1070px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

interface ChatBoxProps {
  $open: boolean;
}

const ChatBox = styled.div<ChatBoxProps>`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  border-left: 2px solid var(--gray-background-active-rgba);
  background-color: var(--white);

  @media (max-width: 1070px) {
    position: fixed;
    bottom: 80px;
    right: 20px;

    border-right: 2px solid var(--gray-background-active-rgba);

    display: ${({ $open }) => ($open ? "flex" : "none")};

    width: calc(100vw - 40px);
    max-width: 400px;

    height: 60vh;
  }
`;

const UserBox = styled.div`
  height: 35px;
`;

const ChattingBox = styled.div`
  width: 100%;
  height: calc(100% - 95px);
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 60px;

  border-top: 2px solid var(--gray-background-active-rgba);

  @media (max-width: 1070px) {
    border-bottom: 2px solid var(--gray-background-active-rgba);
  }
`;

const ChatStyle = {
  Container,
  ChatToggleButton,
  ChatBox,
  UserBox,
  ChattingBox,
  InputBox,
};

export default ChatStyle;
