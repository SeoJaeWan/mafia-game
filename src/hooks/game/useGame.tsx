"use client";
import React, { createContext, useContext, useRef, useState } from "react";
import Game from "./game";
import { useRouter } from "next/navigation";

export type Players = { name: string; color: string; isReady: boolean }[];

type GameContextType = {
  game: Game;
  players: Players;
  playerNumber: number;
  isAdmin: boolean;
  //
  enterRoom: (roomId: string, name: string) => void;
};

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export interface IGameProviderProps {
  children: React.ReactNode;
}

export const GameProvider: React.FC<IGameProviderProps> = ({ children }) => {
  const [players, setPlayers] = useState<Players>([]);
  const [playerNumber, setPlayerNumber] = useState<number>(-1);
  const router = useRouter();

  const isAdmin = playerNumber === 0;

  const enterRoomCallback = ({
    roomId,
    name,
    players,
  }: {
    roomId: string;
    name: string;
    players: Players;
  }) => {
    router.push(`/room/${roomId}`);
    setPlayers(players);
    setPlayerNumber(players.findIndex((player) => player.name === name));
  };

  const game = useRef<Game>(
    new Game({ setPlayers, enterRoomCallback })
  ).current;

  const enterRoom = (roomId: string, name: string) => {
    game.enterRoom(roomId, name);
  };

  return (
    <GameContext.Provider
      value={{
        game,
        playerNumber,
        players,
        isAdmin,
        //
        enterRoom,
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
