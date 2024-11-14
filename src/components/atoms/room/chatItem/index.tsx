import StripDollar from "@/styles/utils/stripDollar";
import ChatItemStyle, { ChatItemStyleType } from "./chatItem.style";
import { IChats } from "@/hooks/useGame/useRoom";

interface IChatItemProps extends StripDollar<ChatItemStyleType>, IChats {}

const ChatItem: React.FC<IChatItemProps> = (props) => {
  const { name, message, isMe, isSystem } = props;

  console.log(isSystem);

  const Chatting = isSystem
    ? ChatItemStyle.SystemChatting
    : ChatItemStyle.PlayerChatting;

  return (
    <Chatting $isMe={isMe}>
      {!isSystem && <ChatItemStyle.NickName>{name}</ChatItemStyle.NickName>}
      <ChatItemStyle.Chat>{message}</ChatItemStyle.Chat>
    </Chatting>
  );
};

export default ChatItem;
