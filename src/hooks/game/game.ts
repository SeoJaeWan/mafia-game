import { io, Socket } from "socket.io-client";
import React from "react";
import {
  GameFinish,
  IPlayer,
  IResponse,
  ResponseMap,
  Turn,
} from "./hooks/usePlaying";
import { IRole, ISetting, PlayableRoleNames } from "./hooks/useGameModeForm";
import { UseFormGetValues } from "react-hook-form";
import { IChats } from "./hooks/useChat";
import { Events } from "./hooks/useEvent";

const socketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_SERVER;

type AddChat = (chat: IChats) => void;
type SetEvents = React.Dispatch<React.SetStateAction<Events>>;
type SetResponse = React.Dispatch<
  React.SetStateAction<IResponse<keyof ResponseMap> | null>
>;

// intro => kill => citizenKill => discussion => vote => mafiaKill => heal => check => kill
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

  setResponse: SetResponse = () => {};
  addChat: AddChat = () => {};
  setEvents: SetEvents = () => {};
  getValues?: UseFormGetValues<ISetting>;

  constructor() {
    this.socket = io(socketUrl);

    this.socketInit();
  }

  setStatePlaying(setResponse: SetResponse) {
    this.setResponse = setResponse;
  }

  setStateChat(addChat: AddChat) {
    this.addChat = addChat;
  }

  setStateEvent(setEvents: SetEvents) {
    this.setEvents = setEvents;
  }

  socketInit() {
    this.socket.on("connect", () => {
      console.log("Connected to server");
    });

    this.chatRss();
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
        this.addChat({
          name: "알림",
          message: "게임이 시작되었습니다.",
          isSystem: true,
        });
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

  chat(message: string, turn: Turn, isSystem?: boolean) {
    if (this.roomId) {
      this.socket.emit("chat", {
        turn,
        message,
        isSystem,
      });
    }
  }

  chatRss() {
    this.socket.on("chatRss", (data: IChats) => {
      this.addChat(data);
    });
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
