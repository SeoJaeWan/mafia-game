"use client";
import React, { createContext, useContext, useRef } from "react";
import Game from "./game";

export const GameContext = createContext({ game: new Game() });

interface IGameProviderProps {
  children: React.ReactNode;
}

export const GameProvider: React.FC<IGameProviderProps> = ({ children }) => {
  const game = useRef<Game>(new Game()).current;

  return (
    <GameContext.Provider
      value={{
        game,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGame = () => {
  const game = useContext(GameContext);

  return game;
};

export default useGame;
