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

export interface IPlayers {
  name: string;
  color?: string;
  isReady?: boolean;
}

interface IGameContext {
  isPlaying: boolean;
  isAdmin?: boolean;
  me?: IPlayers;
  players: IPlayers[];
  chats: IChats[];
  response: IResponse;
  //
  createRoom: (options: IOptions) => void;
  joinRoom: (roomId: string, name: string) => void;
  leaveRoom: () => void;
  chat: (message: string) => void;
  readyPlayer: () => void;
}

export const GameContext = createContext<IGameContext>({
  isPlaying: false,
  isAdmin: false,
  me: undefined,
  players: [],
  chats: [],
  response: { name: "", res: false },
  //
  createRoom: (options: IOptions) => {},
  joinRoom: () => {},
  leaveRoom: () => {},
  chat: (message: string) => {},
  readyPlayer: () => {},
});

interface IGameProviderProps {
  children: React.ReactNode;
}

const GameProvider: React.FC<IGameProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const [players, setPlayers] = useState<IPlayers[]>([]);
  const [chats, setChats] = useState<IChats[]>([]);
  const [response, setResponse] = useState<IResponse>({
    name: "",
    res: false,
  });
  const router = useRouter();
  const game = useRef(
    new Game({ setChats, setResponse, setPlayers, setIsPlaying })
  );

  const me = players.find(({ name }) => name === game.current.name);
  const isAdmin = me?.name === players[0]?.name;

  const createRoom = (options: IOptions) => {
    const { roomId, name, total, time, mode } = options;
    setPlayers([{ name }]);

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

  useEffect(() => {
    if (!game.current.roomId) {
      router.push("/");
    }
  }, []);

  return (
    <GameContext.Provider
      value={{
        isPlaying,
        isAdmin,
        me,
        players,
        chats,
        response,
        //
        createRoom,
        joinRoom,
        leaveRoom: () => game.current.leaveRoom(),
        chat: (message) => game.current.chat(message),
        readyPlayer: () => game.current.readyPlayer(),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
