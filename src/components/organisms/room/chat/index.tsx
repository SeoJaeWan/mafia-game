"use client";

import Users from "@/components/atoms/room/users";
import ChatStyle from "./chat.style";
import InputForm from "@/components/molecules/room/inputForm";
import ChattingList from "@/components/molecules/room/chattingList";

const Chat = () => {
  return (
    <ChatStyle.Container>
      <ChatStyle.UserBox>
        <Users />
      </ChatStyle.UserBox>

      <ChatStyle.ChattingBox>
        <ChattingList />
      </ChatStyle.ChattingBox>

      <ChatStyle.InputBox>
        <InputForm />
      </ChatStyle.InputBox>
    </ChatStyle.Container>
  );
};

export default Chat;
