import ChatItem from "@/components/atoms/room/chatItem";
import ChattingStyle from "./chattingList.style";
import useGame from "@/hooks/useGame";

const ChattingList: React.FC = () => {
  const { chats } = useGame();

  return (
    <ChattingStyle.Container>
      {chats.map((item, index) => (
        <ChatItem
          name={item.name}
          message={item.message}
          isMe={item.isMe}
          key={index}
        />
      ))}
    </ChattingStyle.Container>
  );
};

export default ChattingList;
