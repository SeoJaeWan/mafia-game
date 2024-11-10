import StripDollar from "@/styles/utils/stripDollar";
import ChatItemStyle, { ChatItemStyleType } from "./chatItem.style";

interface IChatItemProps extends StripDollar<ChatItemStyleType> {
  name: string;
  message: string;
}

const ChatItem: React.FC<IChatItemProps> = (props) => {
  const { name, message, isMe } = props;

  return (
    <ChatItemStyle.Container $isMe={isMe}>
      <ChatItemStyle.NickName>{name}</ChatItemStyle.NickName>
      <ChatItemStyle.Chat>{message}</ChatItemStyle.Chat>
    </ChatItemStyle.Container>
  );
};

export default ChatItem;
