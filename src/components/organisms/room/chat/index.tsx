"use client";

import ChatStyle from "./chat.style";
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
        <ChattingList />
      </ChatStyle.ChatBox>
    </ChatStyle.Container>
  );
};

export default Chat;
