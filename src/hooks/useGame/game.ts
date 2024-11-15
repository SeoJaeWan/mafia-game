import { io, Socket } from "socket.io-client";
import React from "react";
import { IPlayers } from "./usePlayers";
import { IChats, IResponse, Time, Turn } from "./useRoom";
import { IRole, ISetting, PlayableRoleNames } from "./useGameModeForm";
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
  setSelectedUser: React.Dispatch<React.SetStateAction<Map<string, string>>>;
}

// intro => kill => 일반인 사망 => discussion => 마피아 투표 => 마피아 사망 => heal => check => kill
// day1          // day 2 ~

type TurnSequence = Partial<Record<Turn, Turn>>;

const day1: TurnSequence = {
  "": "intro",
  intro: "kill",
  kill: "일반인 사망",
};

const day2: TurnSequence = {
  "일반인 사망": "discussion",
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
  animationFinish: () => void;
  selectUser: (name: string) => void;
  submitUser: (selectedUser: Map<string, string>) => void;
}

class Game {
  socket: Socket;
  roomId: string | undefined;
  player: IPlayers = { name: "", color: "" };
  players: number = 0;
  turn: Turn = "intro";
  day: number = 0;
  mode?: ISetting = undefined;

  //
  healPlayer: string = "";

  setChats: React.Dispatch<React.SetStateAction<IChats[]>> = () => {};
  setResponse: React.Dispatch<React.SetStateAction<IResponse>> = () => {};
  setPlayers: React.Dispatch<React.SetStateAction<IPlayers[]>> = () => {};
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>> = () => {};
  setTime: React.Dispatch<React.SetStateAction<Time>> = () => {};
  setTurn: React.Dispatch<React.SetStateAction<Turn>> = () => {};
  setDay: React.Dispatch<React.SetStateAction<number>> = () => {};
  setIsLoadingFinish: React.Dispatch<React.SetStateAction<boolean>> = () => {};
  setSelectedUser: React.Dispatch<React.SetStateAction<Map<string, string>>> =
    () => {};

  getValues?: UseFormGetValues<ISetting>;

  constructor() {
    this.socket = io(socketUrl);

    this.socketInit();
  }

  updateTurn() {
    const dayObj = this.day === 1 ? day1 : day2;
    const nextTurn = dayObj[this.turn] as Turn;

    // 마피아가 살인 후 일반인 사망으로 넘어갈 때 day 변경
    if (nextTurn === "일반인 사망") {
      this.updateDay();

      // night 변경되는 시간 Turn = heal
    } else if (nextTurn === "heal") {
      this.setTime("night");
    }

    this.turn = nextTurn;
    this.setTurn(nextTurn);

    this.systemMessage();
  }

  updateDay() {
    this.setDay((prev) => {
      const update = prev + 1;

      this.setTime("morning");
      this.day = update;
      return update;
    });
  }

  initGame() {
    this.setTime("night");
    this.setTurn("intro");
    this.setDay(1);

    this.day = 1;
    this.turn = "intro";

    this.setIsPlaying(true);
    this.setChats((prev) => [
      ...prev,
      { name: "알림", message: "게임이 시작되었습니다.", isSystem: true },
    ]);
  }

  setRoom({
    setChats,
    setResponse,
    setIsPlaying,
    setTime,
    setTurn,
    setDay,
    setIsLoadingFinish,
    setSelectedUser,
  }: ISetRoom) {
    this.setChats = setChats;
    this.setResponse = setResponse;
    this.setIsPlaying = setIsPlaying;
    this.setTime = setTime;
    this.setTurn = setTurn;
    this.setDay = setDay;
    this.setIsLoadingFinish = setIsLoadingFinish;
    this.setSelectedUser = setSelectedUser;
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
    this.selectUserRes();
    this.submitUserRes();
  }

  createRoom(roomId: string, name: string) {
    this.roomId = roomId;
    this.player.name = name;

    this.socket.emit("createRoom", { roomId, name });
  }

  createRoomRes() {
    this.socket.on("createRoomRes", (data: boolean) => {
      this.setResponse({ name: "create", res: data });
    });
  }

  joinRoom(roomId: string, name: string) {
    this.roomId = roomId;
    this.player.name = name;

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
      this.player.role = role;

      this.setPlayers((prev) =>
        prev.map((player, idx) =>
          player.name === this.player.name
            ? { ...player, role, isDie: false }
            : player
        )
      );

      this.initGame();
    });
  }

  animationFinish() {
    this.setIsLoadingFinish(false);
    this.socket.emit("animationFinish");
  }

  animationFinishRes() {
    this.socket.on("animationFinishRes", () => {
      this.updateTurn();
      this.setIsLoadingFinish(true);
    });
  }

  systemMessage() {
    if (this.turn === "kill") {
      this.setChats((prev) => [
        ...prev,
        {
          name: "알림",
          message: "마피아가 투표를 시작합니다.",
          isSystem: true,
        },
      ]);
    }

    if (this.turn === "discussion") {
      this.setChats((prev) => [
        ...prev,
        {
          name: "알림",
          message: "낮이 되었습니다. 토론을 시작합니다.",
          isSystem: true,
        },
      ]);
    }

    if (this.turn === "heal") {
      this.setChats((prev) => [
        ...prev,
        {
          name: "알림",
          message: "의사가 마피아로부터 한 명을 치료합니다.",
          isSystem: true,
        },
      ]);
    }

    if (this.turn === "check") {
      this.setChats((prev) => [
        ...prev,
        {
          name: "알림",
          message: "경찰이 마피아로 의심되는 인원을 조사합니다.",
          isSystem: true,
        },
      ]);
    }

    if (this.turn === "마피아 투표") {
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

  selectUser(name: string) {
    if (
      (this.turn === "kill" && this.player.role === "mafia") ||
      (this.turn === "heal" && this.player.role === "doctor") ||
      (this.turn === "check" && this.player.role === "police") ||
      this.turn === "마피아 투표"
    ) {
      this.socket.emit("selectUser", { name, role: this.player.role });
    }
  }

  selectUserRes() {
    this.socket.on(
      "selectUserRes",
      ({ name, selector }: { name: string; selector: string }) => {
        this.setSelectedUser((prev) => new Map([...prev, [selector, name]]));
      }
    );
  }

  submitUser(selectedUser: Map<string, string>) {
    this.socket.emit("submitUser", JSON.stringify(Array.from(selectedUser)));
  }

  selectedResult(selectedUser: Map<string, string>) {
    const mostSelected = selectedUser.entries().reduce((acc, [, value]) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const [user, votes] = Object.entries(mostSelected).reduce(
      (max, entry) => (entry[1] > max[1] ? entry : max),
      ["", -1]
    );

    if (this.turn === "마피아 투표") {
      if (this.players / 2 < votes) {
        this.setChats((prev) => [
          ...prev,
          {
            name: "알림",
            message: `${user}님이 투표로 사망하였습니다.`,
            isSystem: true,
          },
        ]);

        this.setPlayers((prev) =>
          prev.map((player) =>
            player.name === user ? { ...player, isDie: true } : player
          )
        );
      } else {
        this.setChats((prev) => [
          ...prev,
          {
            name: "알림",
            message: "투표 결과로 아무도 사망하지 않았습니다.",
            isSystem: true,
          },
        ]);
      }
    }

    if (this.turn === "heal") {
      this.healPlayer = user;
    }

    if (this.turn === "kill") {
      if (this.healPlayer === user) {
        this.setChats((prev) => [
          ...prev,
          {
            name: "알림",
            message: "아무 일도 일어나지 않았습니다.",
            isSystem: true,
          },
        ]);
      } else {
        this.setChats((prev) => [
          ...prev,
          {
            name: "알림",
            message: `${user}님이 마피아에 의해 사망하였습니다.`,
            isSystem: true,
          },
        ]);

        this.setPlayers((prev) =>
          prev.map((player) =>
            player.name === user ? { ...player, isDie: true } : player
          )
        );
      }

      this.healPlayer = "";
    }
  }

  submitUserRes() {
    this.socket.on("submitUserRes", (data: string) => {
      const selectedUser = new Map(JSON.parse(data)) as Map<string, string>;

      this.selectedResult(selectedUser);
      this.updateTurn();

      this.setSelectedUser(new Map());
    });
  }

  chat(message: string) {
    if (this.roomId && this.player.name) {
      this.socket.emit("chat", {
        turn: this.turn,
        message,
      });

      this.setChats((prev) => [
        ...prev,
        { name: this.player.name, message, isMe: true },
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

      this.players = players.length;
    });
  }
}

export default Game;
