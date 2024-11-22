"use client";

import { createContext, useContext, useEffect } from "react";
import useGameState, { IMe, PlayerStatus, Turn } from "./useGameState";
import useResponse from "./useResponse";
import useGame from "../../useGame";
import { useParams } from "next/navigation";
import useGameForm, { IForm, PlayableRoleNames } from "./useGameForm";
import useEvent, { Events } from "./useEvent";

export interface IOptions {
  roomId: string;
  name: string;
}

export type ResponseMap = {
  ready: { players: PlayerStatus[] };
  gameStart: { role: PlayableRoleNames; players: PlayerStatus[] };
  animationFinish: {};
  selectUser: { selector: string; name: string };
  message: { name: string; message: string };
  vote: { name: string; players: PlayerStatus[] };
  heal: { name: string };
  check: { role: PlayableRoleNames };
  kill: { name: string; players: PlayerStatus[] };
  gameFinish: { name: string; state: GameFinish };
  discussion: {};
};

export interface IResponse<T extends keyof ResponseMap> {
  name: string;
  res: ResponseMap[T];
}

const DayRoutine: Partial<Record<Turn, Turn>> = {
  intro: "kill",
  kill: "citizenKill",
  citizenKill: "discussion", // => 살인 | 회복 애니메이션
  discussion: "vote",
  vote: "mafiaKill",
  mafiaKill: "heal", // => 투표 애니메이션
  heal: "check",
  check: "kill",
  mafiaWin: "gameFinish",
  citizenWin: "gameFinish",
  politicianWin: "gameFinish",
};

export type GameFinish = "mafiaWin" | "citizenWin" | "politicianWin";

interface RoomContextType {
  playerStatuses: PlayerStatus[];
  myRole: PlayableRoleNames;
  turn: Turn;
  time: "night" | "morning";
  selectedUsers: Map<string, string>;
  selected: string;
  form: IForm;
  isPlaying: boolean;
  events: Events;
  //
  resetPlayable: () => void;
  gameStart: () => void;
  selectUser: (name: string) => void;
  chat: (message: string) => void;
  setSelected: (name: string) => void;
  clearEvent: () => void;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

const RoomProvider = ({ children }: { children: React.ReactNode }) => {
  const { players, game, isAdmin } = useGame();
  const {
    form,
    //
    resetPlayable,
    calculatePlayable,
  } = useGameForm();
  const {
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
  } = useGameState();
  const { events, updateEvent, clearEvent } = useEvent();

  const sendSystemMessage = (message?: string) => {
    if (!message || !isAdmin) return;
    game.systemChat(message);
  };

  const systemMessage = (nextTurn: Turn) => {
    let message = "";

    if (nextTurn === "kill") {
      message = "마피아가 살인을 시작합니다.";
    }

    if (nextTurn === "discussion") {
      message = "낮이 되었습니다. 토론을 시작합니다.";
    }

    if (nextTurn === "heal") {
      message = "의사가 마피아로부터 한 명을 치료합니다.";
    }

    if (nextTurn === "check") {
      message = "경찰이 마피아로 의심되는 인원을 조사합니다.";
    }

    if (nextTurn === "vote") {
      message = "마피아로 의심되는 인원 투표를 시작합니다.";
    }

    sendSystemMessage(message);
  };

  const updateTurn = () => {
    setTurn((turn) => {
      const nextTurn = DayRoutine[turn] as Turn;

      if (nextTurn === "gameFinish") {
        setIsPlaying(false);
      }

      // 마피아가 살인 후 citizenKill으로 넘어갈 때 day 변경
      if (nextTurn === "citizenKill") {
        setTime("morning");

        // night 변경되는 시간 Turn = heal
      } else if (nextTurn === "heal") {
        setTime("night");
      }

      systemMessage(nextTurn);

      return nextTurn;
    });
  };

  const initGame = () => {
    setTime("night");
    setTurn("intro");

    setIsPlaying(true);
  };

  const updatePlayerStatuses = (playerStatuses: PlayerStatus[]) => {
    setPlayerStatuses(playerStatuses);
  };

  const updateMyRole = (role: PlayableRoleNames) => {
    setMyRole(role);
  };

  const updateSelectedUsers = (selectedUser: [string, string]) => {
    setSelectedUsers((prev) => new Map([...prev, selectedUser]));
  };

  const clearSelected = () => {
    updateTurn();
    setSelectedUsers(new Map());
    setSelected("");
  };

  const gameWinAnimation = (turn: GameFinish) => {
    let message = "";

    if (turn === "mafiaWin") {
      message = "마피아가 승리하였습니다.";
    }

    if (turn === "citizenWin") {
      message = "시민이 승리하였습니다.";
    }

    if (turn === "politicianWin") {
      message = "정치인이 승리하였습니다.";
    }

    updateEvent(turn);
    setTurn(turn);
    sendSystemMessage(message);
  };

  const updateResponse = useResponse({
    updatePlayerStatuses,
    updateMyRole,
    initGame,
    updateTurn,
    updateSelectedUsers,
    clearSelected,
    sendSystemMessage,
    updateEvent,
    gameWinAnimation,
  });

  const gameStart = () => {
    const { time, mode, ...roles } = form.getValues();
    let curRoles = roles;

    const total = players.length;
    const totalRoles = Object.values(roles).reduce((acc, cur) => acc + cur, 0);

    if (total !== totalRoles) {
      curRoles = calculatePlayable();
      form.reset({
        ...curRoles,
        mode,
        time,
      });
    }

    game.gameStart({
      ...curRoles,
      mode,
      time,
    });
  };

  const selectUser = (name: string) => {
    game.selectUser(name, turn);
  };

  const chat = (message: string) => {
    game.chat(message, turn);
  };

  useEffect(() => {
    game.setStatePlaying(updateResponse);
  }, []);

  return (
    <RoomContext.Provider
      value={{
        playerStatuses,
        myRole,
        turn,
        time,
        selectedUsers,
        selected,
        form,
        isPlaying,
        events,
        //
        resetPlayable,
        gameStart,
        selectUser,
        chat,
        setSelected,
        clearEvent,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => {
  const room = useContext(RoomContext);

  if (!room) {
    throw new Error("useRoom must be used within RoomProvider");
  }
  return room;
};

export type RoomType = ReturnType<typeof useRoom>;

export default RoomProvider;
