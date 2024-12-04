"use client";

import Users from "@/components/atoms/room/users";
import ChatStyle from "./chat.style";
import InputForm from "@/components/molecules/room/inputForm";
import ChattingList from "@/components/molecules/room/chattingList";
import { IoChatboxEllipses, IoClose } from "react-icons/io5";
import { useState } from "react";

const Chat = () => {
  const [open, setOpen] = useState(false);

  return (
    <ChatStyle.Container>
      <ChatStyle.ChatToggleButton onClick={() => setOpen((prev) => !prev)}>
        {open ? <IoClose size={35} /> : <IoChatboxEllipses size={35} />}
      </ChatStyle.ChatToggleButton>
      <ChatStyle.ChatBox $open={open}>
        <ChatStyle.ChattingBox>
          <ChattingList />
        </ChatStyle.ChattingBox>

        <ChatStyle.InputBox>
          <InputForm />
        </ChatStyle.InputBox>
      </ChatStyle.ChatBox>
    </ChatStyle.Container>
  );
};

export default Chat;
