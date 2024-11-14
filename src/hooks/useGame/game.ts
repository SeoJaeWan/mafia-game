import { io, Socket } from "socket.io-client";
import React from "react";
import { IPlayers } from "./usePlayers";
import { IChats, IResponse, Time, Turn } from "./useRoom";
import { IRole, ISetting } from "./useGameModeForm";
import { UseFormGetValues } from "react-hook-form";

const socketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_SERVER;

const colors = [
  "#f82d39",
  "#2d5165",
  "#b9ab6c",
  "#0c3fb5",
  "#900599",
  "#b57731",
  "#56e616",
  "#913353",
  "#f1d65d",
  "#3e2528",
];

interface ISetRoom {
  setChats: React.Dispatch<React.SetStateAction<IChats[]>>;
  setResponse: React.Dispatch<React.SetStateAction<IResponse>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setTime: React.Dispatch<React.SetStateAction<Time>>;
  setTurn: React.Dispatch<React.SetStateAction<Turn>>;
  setDay: React.Dispatch<React.SetStateAction<number>>;
  setIsLoadingFinish: React.Dispatch<React.SetStateAction<boolean>>;
}

// intro => kill => discussion => 마피아 투표 => 마피아 사망 => heal => check => kill
// day1          // day 2 ~

type TurnSequence = Partial<Record<Turn, Turn>>;

const day1: TurnSequence = {
  intro: "kill",
  kill: "discussion",
};

const day2: TurnSequence = {
  discussion: "마피아 투표",
  "마피아 투표": "마피아 사망",
  "마피아 사망": "heal",
  heal: "check",
  check: "kill",
  kill: "discussion",
};

export interface IGame {
  leaveRoom: () => void;
  createRoom: (roomId: string, name: string) => void;
  joinRoom: (roomId: string, name: string) => void;
  chat: (message: string) => void;
  readyPlayer: () => void;
  animationFinish: (turn: Turn, day: number) => void;
}

class Game {
  socket: Socket;
  name: string = "";
  roomId: string | undefined;

  mode?: ISetting = undefined;

  setChats: React.Dispatch<React.SetStateAction<IChats[]>> = () => {};
  setResponse: React.Dispatch<React.SetStateAction<IResponse>> = () => {};
  setPlayers: React.Dispatch<React.SetStateAction<IPlayers[]>> = () => {};
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>> = () => {};
  setTime: React.Dispatch<React.SetStateAction<Time>> = () => {};
  setTurn: React.Dispatch<React.SetStateAction<Turn>> = () => {};
  setDay: React.Dispatch<React.SetStateAction<number>> = () => {};
  setIsLoadingFinish: React.Dispatch<React.SetStateAction<boolean>> = () => {};

  getValues?: UseFormGetValues<ISetting>;

  constructor() {
    this.socket = io(socketUrl);

    this.socketInit();
  }

  setRoom({
    setChats,
    setResponse,
    setIsPlaying,
    setTime,
    setTurn,
    setDay,
    setIsLoadingFinish,
  }: ISetRoom) {
    this.setChats = setChats;
    this.setResponse = setResponse;
    this.setIsPlaying = setIsPlaying;
    this.setTime = setTime;
    this.setTurn = setTurn;
    this.setDay = setDay;
    this.setIsLoadingFinish = setIsLoadingFinish;
  }

  setPlayer(setPlayers: React.Dispatch<React.SetStateAction<IPlayers[]>>) {
    this.setPlayers = setPlayers;
  }

  socketInit() {
    this.socket.on("connect", () => {
      console.log("Connected to server");
    });

    this.getMessages();
    this.createRoomRes();
    this.joinRoomRes();
    this.getPlayers();
    this.gameStartRes();
    this.animationFinishRes();
  }

  createRoom(roomId: string, name: string) {
    this.roomId = roomId;
    this.name = name;

    this.socket.emit("createRoom", { roomId, name });
  }

  createRoomRes() {
    this.socket.on("createRoomRes", (data: boolean) => {
      this.setResponse({ name: "create", res: data });
    });
  }

  joinRoom(roomId: string, name: string) {
    this.roomId = roomId;
    this.name = name;

    this.socket.emit("joinRoom", { roomId, name });
  }

  joinRoomRes() {
    this.socket.on("joinRoomRes", (data: boolean) => {
      this.setResponse({ name: "join", res: data });
    });
  }

  leaveRoom() {
    this.roomId = undefined;
    this.socket.emit("leaveRoom");
  }

  gameStart(setting: ISetting) {
    this.socket.emit("gameStart", setting);
  }

  gameStartRes() {
    this.socket.on("gameStartRes", (data: IRole) => {
      const { role } = data;

      this.setPlayers((prev) =>
        prev.map((player, idx) =>
          player.name === this.name ? { ...player, role, isDie: false } : player
        )
      );
      this.setTime("night");
      this.setTurn("kill");
      this.setDay((prev) => prev + 1);

      this.setIsPlaying(true);
      this.setChats((prev) => [
        ...prev,
        { name: "알림", message: "게임이 시작되었습니다.", isSystem: true },
      ]);
    });
  }

  animationFinish(turn: Turn, day: number) {
    this.setIsLoadingFinish(false);
    this.socket.emit("animationFinish", { turn, day });
  }

  animationFinishRes() {
    this.socket.on(
      "animationFinishRes",
      ({ turn, day }: { turn: Turn; day: number }) => {
        const dayObj = day === 1 ? day1 : day2;

        const nextTurn = dayObj[turn];

        this.setIsLoadingFinish(true);
        this.setTurn(turn);

        this.systemMessage(nextTurn as Turn);
      }
    );
  }

  systemMessage(turn: Turn) {
    if (turn === "kill") {
      this.setChats((prev) => [
        ...prev,
        {
          name: "알림",
          message: "마피아가 투표를 시작합니다.",
          isSystem: true,
        },
      ]);
    }

    if (turn === "discussion") {
      this.setChats((prev) => [
        ...prev,
        {
          name: "알림",
          message: "낮이 되었습니다. 토론을 시작합니다.",
          isSystem: true,
        },
      ]);
    }

    if (turn === "heal") {
      this.setChats((prev) => [
        ...prev,
        {
          name: "알림",
          message: "의사가 마피아로부터 한 명을 치료합니다.",
          isSystem: true,
        },
      ]);
    }

    if (turn === "check") {
      this.setChats((prev) => [
        ...prev,
        {
          name: "알림",
          message: "경찰이 마피아로 의심되는 인원을 조사합니다.",
          isSystem: true,
        },
      ]);
    }

    if (turn === "마피아 투표") {
      this.setChats((prev) => [
        ...prev,
        {
          name: "알림",
          message: "마피아로 의심되는 인원 투표를 시작합니다.",
          isSystem: true,
        },
      ]);
    }
  }

  chat(message: string) {
    if (this.roomId && this.name) {
      this.socket.emit("chat", {
        roomId: this.roomId,
        message,
      });

      this.setChats((prev) => [
        ...prev,
        { name: this.name, message, isMe: true },
      ]);
    }
  }

  readyPlayer() {
    this.socket.emit("ready");
  }

  getMessages() {
    this.socket.on("messages", (data: IChats) => {
      this.setChats((prev) => [...prev, data]);
    });
  }

  getPlayers() {
    this.socket.on("players", (players: IPlayers[]) => {
      this.setPlayers(
        players.map((players, idx) => ({ ...players, color: colors[idx] }))
      );
    });
  }
}

export default Game;
