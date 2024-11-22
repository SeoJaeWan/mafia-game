import { io, Socket } from "socket.io-client";
import React from "react";
import { GameFinish, IResponse, ResponseMap } from "./hooks/room/useRoom";
import { UseFormGetValues } from "react-hook-form";
import { IChat } from "./hooks/useChat";
import { Events } from "./hooks/room/useEvent";
import { EnterCallbackType, EnterGameType, Player } from "./useGame";
import { PlayerStatus, Turn } from "./hooks/room/useGameState";
import { ISetting, PlayableRoleNames } from "./hooks/room/useGameForm";

const socketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_SERVER;

type AddChat = (chat: IChat) => void;
type SetEvents = React.Dispatch<React.SetStateAction<Events>>;
type SetResponse = React.Dispatch<
  React.SetStateAction<IResponse<keyof ResponseMap> | null>
>;
type SetPlayers = React.Dispatch<React.SetStateAction<Player[]>>;

// intro => kill => citizenKill => discussion => vote => mafiaKill => heal => check => kill
// day1          // day 2 ~

class Game {
  socket: Socket;

  setPlayers: SetPlayers = () => {};
  setResponse: SetResponse = () => {};
  addChat: AddChat = () => {};
  setEvents: SetEvents = () => {};
  getValues?: UseFormGetValues<ISetting>;

  enterRoomCallback: ({
    type,
    success,
    roomId,
    name,
    players,
  }: EnterCallbackType) => void = () => {};

  constructor({
    setPlayers,
    enterRoomCallback,
  }: {
    setPlayers: SetPlayers;
    enterRoomCallback: ({ roomId, name, players }: EnterCallbackType) => void;
  }) {
    this.socket = io(socketUrl);
    this.setPlayers = setPlayers;
    this.enterRoomCallback = enterRoomCallback;

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

  enterRoom(roomId: string, name: string, type: EnterGameType) {
    this.socket.emit("enterRoom", { roomId, name, type });
  }

  enterRoomRes() {
    this.socket.on("enterRoomRes", this.enterRoomCallback);
  }

  leaveRoom() {
    this.socket.emit("leaveRoom");
  }

  gameStart(setting: ISetting) {
    this.socket.emit("gameStart", setting);
  }

  gameStartRes() {
    this.socket.on(
      "gameStartRes",
      ({
        role,
        playerStatuses,
      }: {
        role: PlayableRoleNames;
        playerStatuses: PlayerStatus[];
      }) => {
        this.addChat({
          name: "알림",
          message: "게임이 시작되었습니다.",
          isSystem: true,
        });

        this.setResponse({
          name: "gameStart",
          res: {
            role,
            playerStatuses,
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
      ({
        name,
        playerStatuses,
      }: {
        name: string;
        playerStatuses: PlayerStatus[];
      }) => {
        this.setResponse({ name: "vote", res: { name, playerStatuses } });
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
      ({
        name,
        playerStatuses,
      }: {
        name: string;
        playerStatuses: PlayerStatus[];
      }) => {
        this.setResponse({ name: "kill", res: { name, playerStatuses } });
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

  systemChat(message: string) {
    this.socket.emit("systemChat", {
      message,
    });
  }

  chat(message: string, turn: Turn) {
    this.socket.emit("chat", {
      turn,
      message,
    });
  }

  chatRss() {
    this.socket.on("chatRss", (data: IChat) => {
      this.addChat(data);
    });
  }

  readyPlayer() {
    this.socket.emit("ready");
  }

  readyPlayerRes() {
    this.socket.on("readyRes", (players: Player[]) => {
      this.setPlayers(players);
    });
  }

  gameFinish() {
    this.socket.on("gameFinish", (state: GameFinish) => {
      console.log(state);
      this.setResponse({ name: "gameFinish", res: { state } });
    });
  }

  getPlayers() {
    this.socket.on("players", (players: PlayerStatus[]) => {
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
