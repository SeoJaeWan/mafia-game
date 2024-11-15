import React, { useEffect, useState } from "react";
import Game from "./game";
import { PlayableRoleNames } from "./useGameModeForm";

export interface IPlayers {
  name: string;
  color: string;
  isReady?: boolean;
  isDie?: boolean;
  role?: PlayableRoleNames;
}

export interface IUsePlayers {
  players: IPlayers[];
  me: IPlayers;
  isAdmin: boolean;
}

const usePlayers = (game: Game): IUsePlayers => {
  const [players, setPlayers] = useState<IPlayers[]>([]);

  const me = game.player;
  const isAdmin = me.name === players[0]?.name;

  useEffect(() => {
    game.setPlayer(setPlayers);
  }, []);

  return {
    players,
    me,
    isAdmin,
  };
};

export default usePlayers;
