import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

interface IChatItemStyleProps {
  $isMe?: boolean;
  $color?: string;
}

const SystemChatting = styled.li`
  display: flex;
  justify-content: center;
  align-self: center;
  align-items: center;

  width: 100%;

  padding: 8px 10px;
  border-radius: 20px;

  background-color: var(--gray-background-rgba);
`;

const PlayerChatting = styled.li<IChatItemStyleProps>`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: ${(props) => (props.$isMe ? "flex-end" : "flex-start")};

  padding: 8px 8px;
  border: 2px solid ${(props) => props.$color || "var(--black)"};
  background-color: ${(props) => props.$color || "var(--black)"};
  border-radius: 10px;

  ${(props) => (props.$isMe ? "margin-right: 9px;" : "margin-left: 9px;")}

  width: auto;
  word-break: break-all;

  &::before {
    content: "";

    position: absolute;
    bottom: 8px;

    ${(props) => (props.$isMe ? "right: -5px" : "left: -5px")};

    z-index: 1;

    width: 0;
    height: 0;

    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;

    ${(props) =>
      props.$isMe
        ? `border-left: 8px solid  ${props.$color}`
        : `border-right: 8px solid  ${props.$color}`};
  }

  &::after {
    content: "";

    position: absolute;
    bottom: 8px;
    ${(props) => (props.$isMe ? "right: -8px" : "left: -8px")};

    width: 0;
    height: 0;

    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;

    ${(props) =>
      props.$isMe
        ? `border-left: 8px solid ${props.$color};`
        : `border-right: 8px solid ${props.$color};`};
  }
`;

interface IChat {
  $isSystem?: boolean;
}

const NickName = styled.p`
  font-size: ${toRem(12)};
  color: var(--white);
`;

const Chat = styled.p<IChat>`
  font-size: ${toRem(16)};
  font-weight: 500;

  color: ${(props) => (props.$isSystem ? "var(--black)" : "var(--white)")};

  white-space: pre-wrap;
`;

export type ChatItemStyleType = IChatItemStyleProps;

const ChatItemStyle = {
  SystemChatting,
  PlayerChatting,
  NickName,
  Chat,
};

export default ChatItemStyle;
