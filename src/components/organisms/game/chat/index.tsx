"use client";

import Users from "@/components/atoms/game/users";
import ChatStyle from "./chat.style";
import InputForm from "@/components/molecules/game/inputForm";
import ChattingList from "@/components/molecules/game/chattingList";

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
