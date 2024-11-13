import { io, Socket } from "socket.io-client";
import React from "react";
import { IPlayers } from "./usePlayers";
import { IChats, IResponse } from "./useRoom";
import { IRole, ISetting } from "./useGameModeForm";
import { UseFormGetValues } from "react-hook-form";

const socketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_SERVER;

interface ISetRoom {
  setChats: React.Dispatch<React.SetStateAction<IChats[]>>;
  setResponse: React.Dispatch<React.SetStateAction<IResponse>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IGame {
  leaveRoom: () => void;
  createRoom: (roomId: string, name: string) => void;
  joinRoom: (roomId: string, name: string) => void;
  chat: (message: string) => void;
  readyPlayer: () => void;
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

  getValues?: UseFormGetValues<ISetting>;

  constructor() {
    this.socket = io(socketUrl);

    this.socketInit();
  }

  setRoom({ setChats, setResponse, setIsPlaying }: ISetRoom) {
    this.setChats = setChats;
    this.setResponse = setResponse;
    this.setIsPlaying = setIsPlaying;
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
        prev.map((player) =>
          player.name === this.name ? { ...player, role } : player
        )
      );
    });

    this.setIsPlaying(true);
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
    this.socket.on("players", (data: IPlayers[]) => {
      this.setPlayers(data);
    });
  }
}

export default Game;
