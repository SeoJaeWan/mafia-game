"use client";

import Users from "@/components/atoms/game/users";
import ChatStyle from "./chat.style";
import Input from "@/components/atoms/common/input";
import Button from "@/components/atoms/common/button";
import toRem from "@/styles/utils/toRem";
import ChatItem from "@/components/atoms/game/chatItem";
import InputForm from "@/components/molecules/game/inputForm";
import ChattingList from "@/components/molecules/game/chattingList";

const dummy = [
  {
    isMe: true,
    user: "user1",
    message: "hello",
  },
  {
    user: "user2",
    message: "hi",
  },
  {
    isMe: true,
    user: "user1",
    message: "how are you?",
  },
  {
    user: "user2",
    message: "I'm good, thank you and you?",
  },
  {
    isMe: true,
    user: "user1",
    message: "I'm good too",
  },
  {
    user: "user2",
    message: "That's great",
  },
  {
    isMe: true,
    user: "user1",
    message: "I'm going to play a game, do you want to join me?",
  },
  {
    user: "user2",
    message: "Sure, I'm in",
  },
  {
    isMe: true,
    user: "user1",
    message: "Great, let's play",
  },
];

const Chat = () => {
  return (
    <ChatStyle.Container>
      <ChatStyle.UserBox>
        <Users />
      </ChatStyle.UserBox>

      <ChatStyle.ChattingBox>
        <ChattingList list={dummy} />
      </ChatStyle.ChattingBox>

      <ChatStyle.InputBox>
        <InputForm />
      </ChatStyle.InputBox>
    </ChatStyle.Container>
  );
};

export default Chat;
