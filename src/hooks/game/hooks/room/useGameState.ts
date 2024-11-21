"use client";

import { useState } from "react";
import useGame, { Players } from "../../useGame";
import { PlayableRoleNames } from "./useGameForm";

export interface PlayerStatus {
  isDie?: boolean;
  role?: PlayableRoleNames;
}

export interface IMe extends Players, PlayerStatus {
  role: PlayableRoleNames;
}

export type Time = "night" | "morning";
export type Turn =
  | "intro"
  | "kill" // 채팅 설명
  | "heal" // 채팅 설명
  | "check" // 채팅 설명
  | "discussion" // 채팅 설명
  | "vote" // 채팅 설명
  | "mafiaKill"
  | "citizenKill"
  | "mafiaWin"
  | "citizenWin"
  | "politicianWin";

const useGameState = () => {
  const { playerNumber, players } = useGame();
  const [playerStatuses, setPlayerStatuses] = useState<PlayerStatus[]>([]);
  const [myRole, setMyRole] = useState<PlayableRoleNames>("citizen");
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState<Time>("night");
  const [turn, setTurn] = useState<Turn>("intro");
  const [selectedUsers, setSelectedUsers] = useState(new Map<string, string>());
  const [selected, setSelected] = useState<string>("");

  const me = players.reduce((acc, player, index) => {
    if (index === playerNumber) {
      return { ...acc, ...player, ...players[index], role: myRole };
    }
    return acc;
  }, {} as IMe);

  const getIsSelect = () => {
    type SpecificTurns = "kill" | "heal" | "check";

    const allowedRolesByTurn: Record<SpecificTurns, PlayableRoleNames[]> = {
      kill: ["mafia"],
      heal: ["doctor"],
      check: ["police"],
    };

    const allowedRoles = allowedRolesByTurn[turn as SpecificTurns] || [];

    if ((!me.isDie && turn === "vote") || allowedRoles.includes(me.role)) {
      return true;
    }

    return false;
  };

  const isSelect = getIsSelect();

  return {
    playerStatuses,
    myRole,
    me,
    isPlaying,
    time,
    turn,
    selectedUsers,
    selected,
    isSelect,
    //
    setPlayerStatuses,
    setMyRole,
    setIsPlaying,
    setTime,
    setTurn,
    setSelectedUsers,
    setSelected,
  };
};

export default useGameState;
