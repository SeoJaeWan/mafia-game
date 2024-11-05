import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

interface IChatItemStyleProps {
  $isMe?: boolean;
}

const Container = styled.li<IChatItemStyleProps>`
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
  Container,
  NickName,
  Chat,
};

export default ChatItemStyle;
