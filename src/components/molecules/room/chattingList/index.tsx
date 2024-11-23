import ChatItem from "@/components/atoms/room/chatItem";
import ChattingStyle from "./chattingList.style";
import useChat from "@/hooks/game/hooks/useChat";
import { useEffect, useRef } from "react";

const ChattingList: React.FC = () => {
  const { chats } = useChat();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <ChattingStyle.Container ref={listRef}>
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
