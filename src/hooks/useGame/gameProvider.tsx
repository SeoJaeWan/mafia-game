"use client";
import React, { createContext } from "react";
import Game, { IGame } from "./game";
import useRoom from "./useRoom";
import useGameModeForm, { IUseGameModeForm } from "./useGameModeForm";

type TGameContext = IUseGameModeForm & IGame;

export const GameContext = createContext<TGameContext>({} as TGameContext);

interface IGameProviderProps {
  children: React.ReactNode;
}

const game = new Game();

const GameProvider: React.FC<IGameProviderProps> = ({ children }) => {
  const room = useRoom(game);
  const gameForm = useGameModeForm(room.players, game);

  return (
    <GameContext.Provider
      value={{
        ...room,
        ...gameForm,
        //
        enterRoom: (roomId, name) => game.enterRoom(roomId, name),
        leaveRoom: () => game.leaveRoom(),
        readyPlayer: () => game.readyPlayer(),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
