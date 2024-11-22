"use client";

import { useState } from "react";
import useGame, { Player } from "../../useGame";
import { PlayableRoleNames } from "./useGameForm";

export interface PlayerStatus {
  isDie?: boolean;
  role?: PlayableRoleNames;
}

export interface IMe extends Player, PlayerStatus {
  role: PlayableRoleNames;
}

export type Time = "night" | "morning";
export type Turn =
  | "intro" // 시작
  | "kill" // 마피아 살인 투표
  | "heal" // 의사 회복
  | "check" // 경찰 조사
  | "discussion" // 토론
  | "vote" // 투표
  | "mafiaKill" // 투표 결과 애니메이션
  | "citizenKill" // 마피아 살인 애니메이션
  | "mafiaWin" // 마피아 승리
  | "citizenWin" // 시민 승리
  | "politicianWin" // 정치인 승리
  | "gameFinish"; // 게임 종료

const useGameState = () => {
  const [playerStatuses, setPlayerStatuses] = useState<PlayerStatus[]>([]);
  const [myRole, setMyRole] = useState<PlayableRoleNames>("citizen");
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState<Time>("night");
  const [turn, setTurn] = useState<Turn>("intro");
  const [selectedUsers, setSelectedUsers] = useState(new Map<string, string>());
  const [selected, setSelected] = useState<string>("");

  return {
    playerStatuses,
    myRole,
    isPlaying,
    time,
    turn,
    selectedUsers,
    selected,
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
