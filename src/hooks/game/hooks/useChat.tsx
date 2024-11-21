"use client";

import { createContext, useContext, useEffect, useState } from "react";
import useGame from "../useGame";

export interface IChat {
  name: string;
  message: string;
  isSystem?: boolean;
}

type ChatContextType = {
  chats: IChat[];
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<IChat[]>([]);
  const { game } = useGame();

  const addChat = (chat: IChat) => {
    setChats((prev) => [...prev, chat]);
  };

  useEffect(() => {
    game.setStateChat(addChat);
  }, []);

  return (
    <ChatContext.Provider value={{ chats }}>{children}</ChatContext.Provider>
  );
};

const useChat = () => {
  const chats = useContext(ChatContext);

  if (!chats) {
    throw new Error("useChat must be used within a ChatProvider");
  }

  return chats;
};

export default useChat;
