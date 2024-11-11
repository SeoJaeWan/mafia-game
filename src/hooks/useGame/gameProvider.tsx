"use client";
import React, { createContext, useEffect, useRef, useState } from "react";
import Game from "./game";
import { IFormValues } from "../useRoomForm";
import { useRouter } from "next/navigation";

export interface IChats {
  name: string;
  message: string;
  isMe?: boolean;
}

export interface IResponse {
  name: string;
  res: boolean;
}

interface IOptions extends IFormValues {
  roomId: string;
}

interface IGameContext {
  isPlaying: boolean;
  players: string[];
  chats: IChats[];
  response: IResponse;
  //
  createRoom: (options: IOptions) => void;
  joinRoom: (roomId: string, name: string) => void;
  leaveRoom: (roomId: string) => void;
  chat: (message: string) => void;
}

export const GameContext = createContext<IGameContext>({
  isPlaying: false,
  players: [],
  chats: [],
  response: { name: "", res: false },
  //
  createRoom: (options: IOptions) => {},
  joinRoom: () => {},
  leaveRoom: () => {},
  chat: (message: string) => {},
});

interface IGameProviderProps {
  children: React.ReactNode;
}

const GameProvider: React.FC<IGameProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const [players, setPlayers] = useState<string[]>([]);
  const [chats, setChats] = useState<IChats[]>([]);
  const [response, setResponse] = useState<IResponse>({
    name: "",
    res: false,
  });
  const router = useRouter();

  const game = useRef(
    new Game({ setChats, setResponse, setPlayers, setIsPlaying })
  );

  const createRoom = (options: IOptions) => {
    const { roomId, name, total, time, mode } = options;
    setPlayers([name]);

    game.current.createRoom(roomId, name);
  };

  const joinRoom = (roomId: string, name: string) => {
    game.current.joinRoom(roomId, name);
  };

  useEffect(() => {
    const id = game.current.roomId;

    if (response.name === "join") {
      if (response.res) {
        router.push(`/room/${id}`);
      } else {
        alert("방 참가에 실패했습니다.");
      }
    }

    if (response.name === "create") {
      if (response.res) {
        router.push(`/room/${id}`);
      } else {
        alert("방 생성에 실패했습니다.");
      }
    }
  }, [response]);

  return (
    <GameContext.Provider
      value={{
        isPlaying,
        players,
        chats,
        response,
        //
        createRoom,
        joinRoom,
        leaveRoom: () => game.current.leaveRoom("room1"),
        chat: (message) => game.current.chat(message),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
