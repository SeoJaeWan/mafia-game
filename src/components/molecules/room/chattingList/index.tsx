import ChatItem from "@/components/atoms/room/chatItem";
import ChattingStyle from "./chattingList.style";
import useChat from "@/hooks/game/hooks/useChat";

const ChattingList: React.FC = () => {
  const { chats } = useChat();

  return (
    <ChattingStyle.Container>
      {chats.map((item, index) => (
        <ChatItem
          name={item.name}
          message={item.message}
          isSystem={item.isSystem}
          key={index}
        />
      ))}
    </ChattingStyle.Container>
  );
};

export default ChattingList;
