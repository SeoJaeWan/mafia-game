import { io, Socket } from "socket.io-client";
import { IChats, IResponse } from "./gameProvider";
import React from "react";

const socketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_SERVER;

interface IGameProps {
  setChats: React.Dispatch<React.SetStateAction<IChats[]>>;
  setResponse: React.Dispatch<React.SetStateAction<IResponse>>;
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

class Game {
  socket: Socket;
  name: string = "";
  roomId: string | undefined;

  setChats: React.Dispatch<React.SetStateAction<IChats[]>>;
  setResponse: React.Dispatch<React.SetStateAction<IResponse>>;
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;

  constructor(props: IGameProps) {
    const { setChats, setResponse, setPlayers, setIsPlaying } = props;

    this.socket = io(socketUrl);

    this.setChats = setChats;
    this.setResponse = setResponse;
    this.setPlayers = setPlayers;
    this.setIsPlaying = setIsPlaying;

    this.socketInit();
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

  leaveRoom(roomId: string) {
    this.roomId = undefined;
    this.socket.emit("leaveRoom", roomId);
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

  getMessages() {
    this.socket.on("messages", (data: IChats) => {
      this.setChats((prev) => [...prev, data]);
    });
  }

  getPlayers() {
    this.socket.on("players", (data: string[]) => {
      this.setPlayers(data);
    });
  }
}

export default Game;
