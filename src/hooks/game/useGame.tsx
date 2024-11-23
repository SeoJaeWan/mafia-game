"use client";
import React, { createContext, useContext, useRef, useState } from "react";
import Game from "./game";
import { useRouter } from "next/navigation";

export type Player = { name: string; color: string; isReady: boolean };
export type EnterGameType = "create" | "join";
export type EnterGameResType = "sameName" | "noRoom";

type GameContextType = {
  game: Game;
  players: Player[];
  playerNumber: number;
  isAdmin: boolean;
};

export type EnterCallbackType = {
  roomId: string;
  name: string;
  players: Player[];
  type?: EnterGameResType;
  success: boolean;
};

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export interface IGameProviderProps {
  children: React.ReactNode;
}

export const GameProvider: React.FC<IGameProviderProps> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerNumber, setPlayerNumber] = useState<number>(-1);
  const router = useRouter();

  const isAdmin = playerNumber === 0;

  const enterRoomCallback = ({
    roomId,
    name,
    players,
    type,
    success,
  }: EnterCallbackType) => {
    if (!success) {
      if (type === "sameName") {
        return alert("이미 같은 이름이 존재합니다.");
      }

      if (type === "noRoom") {
        return alert("방이 존재하지 않습니다.");
      }
    }

    const playerNumber = players.findIndex((player) => player.name === name);

    if (playerNumber === -1) {
      return alert("방에 입장하지 못했습니다.");
    }

    router.push(`/room/${roomId}`);
    setPlayers(players);
    setPlayerNumber(playerNumber);
  };

  const game = useRef<Game>(
    new Game({ setPlayers, enterRoomCallback })
  ).current;

  return (
    <GameContext.Provider
      value={{
        game,
        playerNumber,
        players,
        isAdmin,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGame = () => {
  const game = useContext(GameContext);

  if (!game) {
    throw new Error("useGame must be used within a GameProvider");
  }

  return game;
};

export default useGame;
