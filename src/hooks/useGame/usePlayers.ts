import React, { useEffect, useState } from "react";
import Game from "./game";

export interface IPlayers {
  name: string;
  color?: string;
  isReady?: boolean;
  role?: string;
}

export interface IUsePlayers {
  players: IPlayers[];
  me?: IPlayers;
  isAdmin: boolean;
}

const usePlayers = (game: Game): IUsePlayers => {
  const [players, setPlayers] = useState<IPlayers[]>([]);

  const me = players.find(({ name }) => name === game.name);
  const isAdmin = me?.name === players[0]?.name;

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
