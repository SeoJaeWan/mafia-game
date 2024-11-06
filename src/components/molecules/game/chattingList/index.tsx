import ChatItem from "@/components/atoms/game/chatItem";
import ChattingStyle from "./chattingList.style";

interface ChattingListProps {
  list: {
    user: string;
    message: string;
    isMe?: boolean;
  }[];
}

const ChattingList: React.FC<ChattingListProps> = (props) => {
  const { list } = props;

  return (
    <ChattingStyle.Container>
      {list.map((item, index) => (
        <ChatItem
          user={item.user}
          message={item.message}
          isMe={item.isMe}
          key={index}
        />
      ))}
    </ChattingStyle.Container>
  );
};

export default ChattingList;
