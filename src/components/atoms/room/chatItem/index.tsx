import StripDollar from "@/styles/utils/stripDollar";
import ChatItemStyle, { ChatItemStyleType } from "./chatItem.style";
import useGame, { Message } from "@/hooks/useGame";

interface IChatItemProps extends StripDollar<ChatItemStyleType>, Message {}

const ChatItem: React.FC<IChatItemProps> = (props) => {
  const { name, color, message, isSystem } = props;
  const { player } = useGame();

  const isMe = player!.name === name;

  const Chatting = isSystem
    ? ChatItemStyle.SystemChatting
    : ChatItemStyle.PlayerChatting;

  return (
    <Chatting $isMe={isMe} $color={color}>
      {!isSystem && <ChatItemStyle.NickName>{name}</ChatItemStyle.NickName>}
      <ChatItemStyle.Chat $isSystem={isSystem}>{message}</ChatItemStyle.Chat>
    </Chatting>
  );
};

export default ChatItem;
