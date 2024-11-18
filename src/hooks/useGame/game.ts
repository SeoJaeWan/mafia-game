import { io, Socket } from "socket.io-client";
import React from "react";
import {
  GameFinish,
  IChats,
  IPlayer,
  IResponse,
  ResponseMap,
  Turn,
} from "./useRoom";
import { IRole, ISetting, PlayableRoleNames } from "./useGameModeForm";
import { UseFormGetValues } from "react-hook-form";

const socketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_SERVER;

interface ISetRoom {
  setResponse: React.Dispatch<
    React.SetStateAction<IResponse<keyof ResponseMap> | null>
  >;
}

// intro => kill => 일반인 사망 => discussion => vote => 마피아 사망 => heal => check => kill
// day1          // day 2 ~

export interface IGame {
  leaveRoom: () => void;
  enterRoom: (roomId: string, name: string) => void;
  readyPlayer: () => void;
  discussionFinish: () => void;
}

class Game {
  socket: Socket;
  roomId: string | undefined;

  setResponse: React.Dispatch<
    React.SetStateAction<IResponse<keyof ResponseMap> | null>
  > = () => {};
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
    this.gameStartRes();
    this.animationFinishRes();
    this.selectUserRes();
    this.voteResult();
    this.healResult();
    this.checkResult();
    this.killResult();
    this.gameFinish();
    this.discussionFinishRes();
  }

  enterRoom(roomId: string, name: string) {
    this.roomId = roomId;

    this.socket.emit("enterRoom", { roomId, name });
  }

  enterRoomRes() {
    this.socket.on(
      "enterRoomRes",
      ({ name, players }: { name: string; players: IPlayer[] }) => {
        this.setResponse({ name: "enterRoom", res: { name, players } });
      }
    );
  }

  leaveRoom() {
    this.roomId = undefined;
    this.socket.emit("leaveRoom");
  }

  gameStart(setting: ISetting) {
    this.socket.emit("gameStart", setting);
  }

  gameStartRes() {
    this.socket.on(
      "gameStartRes",
      ({ role, players }: { role: PlayableRoleNames; players: IPlayer[] }) => {
        this.setResponse({
          name: "gameStart",
          res: {
            role,
            players,
          },
        });
      }
    );
  }

  animationFinish() {
    this.socket.emit("animationFinish");
  }

  animationFinishRes() {
    this.socket.on("animationFinishRes", () => {
      this.setResponse({ name: "animationFinish", res: {} });
    });
  }

  selectUser(name: string, turn: Turn) {
    this.socket.emit("selectUser", { name, turn });
  }

  selectUserRes() {
    this.socket.on(
      "selectUserRes",
      ({ name, selector }: { name: string; selector: string }) => {
        this.setResponse({ name: "selectUser", res: { name, selector } });
      }
    );
  }

  voteResult() {
    this.socket.on(
      "vote result",
      ({ name, players }: { name: string; players: IPlayer[] }) => {
        this.setResponse({ name: "vote", res: { name, players } });
      }
    );
  }

  healResult() {
    this.socket.on("heal result", (name: string) => {
      this.setResponse({ name: "heal", res: { name } });
    });
  }

  checkResult() {
    this.socket.on("check result", (role: PlayableRoleNames) => {
      this.setResponse({ name: "check", res: { role } });
    });
  }

  killResult() {
    this.socket.on(
      "kill result",
      ({ name, players }: { name: string; players: IPlayer[] }) => {
        this.setResponse({ name: "kill", res: { name, players } });
      }
    );
  }

  discussionFinish() {
    this.socket.emit("discussionFinish");
  }

  discussionFinishRes() {
    this.socket.on("discussionFinishRes", () => {
      this.setResponse({ name: "discussion", res: {} });
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
    this.socket.on("readyRes", (players: IPlayer[]) => {
      this.setResponse({ name: "ready", res: { players } });
    });
  }

  gameFinish() {
    this.socket.on("gameFinish", (state: GameFinish) => {
      this.setResponse({ name: "gameFinish", res: { state } });
    });
  }

  getMessages() {
    this.socket.on("messages", (data: IChats) => {
      const { name, message } = data;

      this.setResponse({ name: "message", res: { name, message } });
    });
  }

  getPlayers() {
    this.socket.on("players", (players: IPlayer[]) => {
      this.setResponse({
        name: "players",
        res: {
          players,
        },
      });
    });
  }
}

export default Game;
