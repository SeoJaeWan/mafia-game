"use client";
import React, { createContext, useRef, useState } from "react";
import Game from "./game";
import { IFormValues } from "../useRoomForm";

export interface IChats {
  name: string;
  message: string;
  isMe?: boolean;
}

interface IOptions extends IFormValues {
  roomId: string;
}

interface IGameContext {
  players: string[];
  chats: IChats[];
  //
  setOptions: (options: IOptions) => void;
  joinRoom: (roomId: string, name: string) => void;
  leaveRoom: (roomId: string) => void;
  chat: (message: string) => void;
}

export const GameContext = createContext<IGameContext>({
  players: [],
  chats: [],
  //
  setOptions: (options: IOptions) => {},
  joinRoom: () => {},
  leaveRoom: () => {},
  chat: (message: string) => {},
});

interface IGameProviderProps {
  children: React.ReactNode;
}

const GameProvider: React.FC<IGameProviderProps> = ({ children }) => {
  const [players, setPlayers] = useState<string[]>([]);
  const [chats, setChats] = useState<IChats[]>([]);

  const game = useRef(new Game({ setChats }));

  const setOptions = (options: IOptions) => {
    const { roomId, nickname, total, time, mode } = options;
    setPlayers([nickname]);

    game.current.createRoom(roomId, nickname);
  };

  return (
    <GameContext.Provider
      value={{
        players,
        chats,
        //
        setOptions,
        //
        joinRoom: () => game.current.joinRoom("room1", ""),
        leaveRoom: () => game.current.leaveRoom("room1"),
        chat: (message) => game.current.chat(message),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
