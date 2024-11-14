import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

interface IChatItemStyleProps {
  $isMe?: boolean;
}

const SystemChatting = styled.li`
  display: flex;
  justify-content: center;
  align-self: center;
  align-items: center;

  width: 80%;

  padding: ${toRem(8)} ${toRem(10)};
  border-radius: ${toRem(20)};

  background-color: var(--gray-background-rgba);
`;

const PlayerChatting = styled.li<IChatItemStyleProps>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isMe ? "flex-end" : "flex-start")};

  width: 100%;
`;

const NickName = styled.p`
  font-size: ${toRem(12)};
  color: var(--gray-text);
`;

const Chat = styled.p`
  font-size: ${toRem(16)};
  font-weight: 500;
`;

export type ChatItemStyleType = IChatItemStyleProps;

const ChatItemStyle = {
  SystemChatting,
  PlayerChatting,
  NickName,
  Chat,
};

export default ChatItemStyle;
