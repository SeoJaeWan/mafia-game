import { io, Socket } from "socket.io-client";
import React from "react";
import { IChats, IResponse, Turn } from "./useRoom";
import { IRole, ISetting } from "./useGameModeForm";
import { UseFormGetValues } from "react-hook-form";

const socketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_SERVER;

interface ISetRoom {
  setResponse: React.Dispatch<React.SetStateAction<IResponse>>;
}

// intro => kill => 일반인 사망 => discussion => 마피아 투표 => 마피아 사망 => heal => check => kill
// day1          // day 2 ~

type TurnSequence = Partial<Record<Turn, Turn>>;

export interface IGame {
  leaveRoom: () => void;
  enterRoom: (roomId: string, name: string) => void;
  readyPlayer: () => void;
}

class Game {
  socket: Socket;
  roomId: string | undefined;

  setResponse: React.Dispatch<React.SetStateAction<IResponse>> = () => {};
  getValues?: UseFormGetValues<ISetting>;

  constructor() {
    this.socket = io(socketUrl);

    this.socketInit();
  }

  setRoom({ setResponse }: ISetRoom) {
    this.setResponse = setResponse;
  }

  socketInit() {
    this.socket.on("connect", () => {
      console.log("Connected to server");
    });

    this.getMessages();
    this.enterRoomRes();
    this.readyPlayerRes();
    this.getPlayers();
    this.gameStartRes();
    this.animationFinishRes();
    this.selectUserRes();
    this.submitUserRes();
  }

  enterRoom(roomId: string, name: string) {
    this.roomId = roomId;

    this.socket.emit("enterRoom", { roomId, name });
  }

  enterRoomRes() {
    this.socket.on("enterRoomRes", (name) => {
      this.setResponse({ name: "enterRoom", res: { name } });
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
      this.setResponse({
        name: "gameStart",
        res: {
          role,
        },
      });
    });
  }

  animationFinish() {
    this.socket.emit("animationFinish");
  }

  animationFinishRes() {
    this.socket.on("animationFinishRes", () => {
      this.setResponse({ name: "animationFinish", res: {} });
    });
  }

  selectUser(name: string, role: string) {
    this.socket.emit("selectUser", { name, role });
  }

  selectUserRes() {
    this.socket.on(
      "selectUserRes",
      ({ name, selector }: { name: string; selector: string }) => {
        this.setResponse({ name: "selectUser", res: { name, selector } });
      }
    );
  }

  submitUser(selectedUser: Map<string, string>) {
    this.socket.emit("submitUser", JSON.stringify(Array.from(selectedUser)));
  }

  submitUserRes() {
    this.socket.on("submitUserRes", (data: string) => {
      this.setResponse({ name: "submitUser", res: { selectedUserRaw: data } });
    });
  }

  chat(message: string, turn: Turn) {
    if (this.roomId) {
      this.socket.emit("chat", {
        turn,
        message,
      });
    }
  }

  readyPlayer() {
    this.socket.emit("ready");
  }

  readyPlayerRes() {
    this.socket.on("readyRes", (name) => {
      this.setResponse({ name: "ready", res: { name } });
    });
  }

  getMessages() {
    this.socket.on("messages", (data: IChats) => {
      const { name, message } = data;

      this.setResponse({ name: "message", res: { name, message } });
    });
  }

  getPlayers() {
    this.socket.on("players", (players: string[]) => {
      this.setResponse({
        name: "players",
        res: {
          playersRaw: JSON.stringify(players),
        },
      });
    });
  }
}

export default Game;
