"use client";
import React, { createContext, useEffect } from "react";
import Game, { IGame } from "./game";
import usePlayers, { IUsePlayers } from "./usePlayers";
import useRoom, { IUseRoom } from "./useRoom";
import useGameModeForm, { IUseGameModeForm } from "./useGameModeForm";
import { useRouter } from "next/navigation";

type TGameContext = IUseRoom & IUsePlayers & IUseGameModeForm & IGame;

export const GameContext = createContext<TGameContext>({} as TGameContext);

interface IGameProviderProps {
  children: React.ReactNode;
}

const game = new Game();

const GameProvider: React.FC<IGameProviderProps> = ({ children }) => {
  const playerData = usePlayers(game);
  const { players } = playerData;
  const room = useRoom(game);
  const gameForm = useGameModeForm(players, game);
  const router = useRouter();

  const { response } = room;

  useEffect(() => {
    const id = game.roomId;

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
        ...room,
        ...playerData,
        ...gameForm,
        //
        createRoom: (roomId, name) => game.createRoom(roomId, name),
        joinRoom: (roomId, name) => game.joinRoom(roomId, name),
        leaveRoom: () => game.leaveRoom(),
        chat: (message, turn) => game.chat(message, turn),
        readyPlayer: () => game.readyPlayer(),
        animationFinish: (turn, day) => game.animationFinish(turn, day),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
