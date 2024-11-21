import StripDollar from "@/styles/utils/stripDollar";
import ChatItemStyle, { ChatItemStyleType } from "./chatItem.style";
import { IChat } from "@/hooks/game/hooks/useChat";
import useGame from "@/hooks/game/useGame";
import { useRoom } from "@/hooks/game/hooks/room/useRoom";

interface IChatItemProps extends StripDollar<ChatItemStyleType>, IChat {}

const ChatItem: React.FC<IChatItemProps> = (props) => {
  const { name, message, isSystem } = props;
  const { players, playerNumber } = useGame();

  const me = players[playerNumber];

  const isMe = me.name === name;
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
