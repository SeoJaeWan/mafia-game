"use client";
import React, { createContext, useRef } from "react";
import Game from "./game";
import usePlayers, { IUsePlayers } from "./usePlayers";
import useRoom, { IUseRoom } from "./useRoom";
import useGameModeForm, { IUseGameModeForm } from "./useGameModeForm";

type TGameContext = IUseRoom & IUsePlayers & IUseGameModeForm & Game;

export const GameContext = createContext<TGameContext>({} as TGameContext);

interface IGameProviderProps {
  children: React.ReactNode;
}

const game = new Game();
const GameProvider: React.FC<IGameProviderProps> = ({ children }) => {
  const { players, me, isAdmin } = usePlayers(game);
  const {
    isPlaying,
    chats,
    response,
    //
  } = useRoom(game);
  const { form, resetPlayable } = useGameModeForm(players);

  return (
    <GameContext.Provider
      value={{
        isPlaying,
        isAdmin,
        me,
        players,
        chats,
        response,
        form,
        //
        createRoom: (roomId, name) => game.createRoom(roomId, name),
        joinRoom: (roomId, name) => game.joinRoom(roomId, name),
        leaveRoom: () => game.leaveRoom(),
        chat: (message) => game.chat(message),
        readyPlayer: () => game.readyPlayer(),
        resetPlayable,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
