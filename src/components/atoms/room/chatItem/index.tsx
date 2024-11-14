import StripDollar from "@/styles/utils/stripDollar";
import ChatItemStyle, { ChatItemStyleType } from "./chatItem.style";
import { IChats } from "@/hooks/useGame/useRoom";
import useGame from "@/hooks/useGame";

interface IChatItemProps extends StripDollar<ChatItemStyleType>, IChats {}

const ChatItem: React.FC<IChatItemProps> = (props) => {
  const { name, message, isMe, isSystem } = props;
  const { players } = useGame();

  const color = players.find((player) => player.name === name)?.color;

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
