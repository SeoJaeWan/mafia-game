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
  z-index: 5;

  display: ${({ $open }) => ($open ? "flex" : "none")};
  flex-direction: column;

  width: calc(100vw - 40px);
  max-width: 400px;

  height: 60vh;

  border: 2px solid var(--gray-background-active-rgba);
  border-radius: 5px;

  background-color: var(--white);
`;

const ChatStyle = {
  Container,
  ChatToggleButton,
  ChatBox,
};

export default ChatStyle;
