import ChatItem from "@/components/atoms/room/chatItem";
import ChattingStyle from "./chattingList.style";
import { useEffect, useRef } from "react";
import useGame from "@/hooks/useGame";

const ChattingList: React.FC = () => {
  const { messageList } = useGame();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messageList]);

  return (
    <ChattingStyle.Container ref={listRef}>
      {messageList.map((item, idx) => (
        <ChatItem
          name={item.name}
          message={item.message}
          color={item.color}
          isSystem={item.isSystem}
          time={item.time}
          key={idx}
        />
      ))}
    </ChattingStyle.Container>
  );
};

export default ChattingList;
