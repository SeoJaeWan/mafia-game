import { createContext, useContext, useEffect, useState } from "react";
import useGame from "../gameProvider";

export interface IChats {
  name: string;
  message: string;
  isMe?: boolean;
  isSystem?: boolean;
}

const ChatContext = createContext<{ chats: IChats[] }>({
  chats: [],
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<IChats[]>([]);
  const { game } = useGame();

  const addChat = (chat: IChats) => {
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

  return chats;
};

export default useChat;
