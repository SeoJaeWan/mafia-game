import { io, Socket } from "socket.io-client";
import { IChats } from "./gameProvider";
import React from "react";

const socketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_SERVER;

interface IGameProps {
  setChats: React.Dispatch<React.SetStateAction<IChats[]>>;
}

class Game {
  socket: Socket;
  name: string = "";
  roomId: string | undefined;

  setChats: React.Dispatch<React.SetStateAction<IChats[]>>;

  constructor(props: IGameProps) {
    const { setChats } = props;

    this.setChats = setChats;
    this.socket = io(socketUrl);

    this.socket.on("connect", () => {
      console.log("Connected to server");
    });
  }

  createRoom(roomId: string, name: string) {
    this.roomId = roomId;
    this.name = name;

    this.socket.emit("createRoom", roomId);
  }

  joinRoom(roomId: string, name: string) {
    this.roomId = roomId;
    this.name = name;

    this.socket.emit("joinRoom", roomId);
  }

  leaveRoom(roomId: string) {
    this.roomId = undefined;
    this.socket.emit("leaveRoom", roomId);
  }

  chat(message: string) {
    if (this.roomId && this.name) {
      this.socket.emit("chat", {
        roomId: this.roomId,
        name: this.name,
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
}

export default Game;
