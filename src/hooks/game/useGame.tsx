"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

// 방 접속
// 방 생성
// 방 나가기

// 준비
// 준비 취소
// 게임 시작

// 직업 안내
// 마피아 => 투표
// 시민 => 투표

// 채팅
// 이름, 메시지, 시스템 여부

// 플레이어
// 이름, 직업, 생존 여부, 색상

// 레디 한 플레이어
// 이름 배열

// 낯 / 밤 상태

export interface EnterRoom {
  roomId: string;
  name: string;
}

export interface Player {
  name: string;
  color: string;
  role: string;
  alive: boolean;
  isAdmin: boolean;
}

interface ShortPlayer {
  name: string;
  color: string;
}

export type PlayerList = ShortPlayer[];

export interface Selected {
  name: string;
  selector: string;
}

export interface Message {
  name: string;
  message: string;
  color: string;
  isSystem?: boolean;
}

export type timePeriod = "morning" | "night";

export type EnterGameType = "create" | "join";
export type EnterGameResType = "sameName" | "noRoom";

const socketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_SERVER;

type GameContextType = {
  isPlaying: boolean;
  player: Player | undefined;
  playerList: PlayerList;
  deadPlayerList: PlayerList;
  readyPlayerList: string[];
  messageList: Message[];
  selectedList: Selected[];
  //
  createRoom: (room: EnterRoom) => void;
  joinRoom: (room: EnterRoom) => void;
};

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export interface IGameProviderProps {
  children: React.ReactNode;
}

export const GameProvider: React.FC<IGameProviderProps> = ({ children }) => {
  const [player, setPlayer] = useState<Player>();
  const [playerList, setPlayerList] = useState<PlayerList>([]);
  const [deadPlayerList, setDeadPlayerList] = useState<PlayerList>([]);
  const [readyPlayerList, setReadyPlayerList] = useState<string[]>([]);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [selectedList, setSelectedList] = useState<Selected[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const socketRef = useRef<Socket>();

  const router = useRouter();

  console.log(player, playerList);

  const roomSocket = (socket: Socket) => {
    socket.on("playerList", (playerList: PlayerList) => {
      console.log(playerList, "playerList");
      setPlayerList(playerList);
    });

    socket.on("readyPlayerList", (name: string) => {
      setReadyPlayerList((prev) => {
        if (prev.includes(name)) {
          return prev.filter((item) => item !== name);
        }
        return [...prev, name];
      });
    });

    socket.on("getMessage", (message: Message) => {
      setMessageList((prev) => [...prev, message]);
    });

    socket.on("startGameSuccess", (role: string) => {
      setIsPlaying(true);
      setPlayer((prev) => ({ ...(prev as Player), role }));
    });

    // 마피아 동료 투표
    socket.on("selected", (selected: Selected) => {
      setSelectedList((prev) => {
        const updated = [...prev];
        const findIndex = updated.findIndex(
          (item) => item.selector === selected.selector
        );

        if (findIndex === -1) {
          return [...updated, selected];
        }

        updated[findIndex] = selected;

        return updated;
      });
    });

    // 마피아 투표 결과 : 시민 사망
    socket.on("citizenDie", (player: ShortPlayer) => {
      setPlayerList((prev) => prev.filter((item) => item.name !== player.name));
      setDeadPlayerList((prev) => [...prev, player]);
    });

    // 마피아 투표 결과 : 시민 사망 회피 (의사 치료)
    socket.on("citizenHeal", () => {});

    // 시민 투표 결과 : 사형
    socket.on("voteKill", (player: ShortPlayer) => {
      setPlayerList((prev) => prev.filter((item) => item.name !== player.name));
      setDeadPlayerList((prev) => [...prev, player]);
    });

    // 시민 투표 결과 : 사형 회피
    socket.on("voteSafe", () => {});

    // 조사 결과 (경찰)
    socket.on("policeResult", (role: string) => {});
  };

  const createRoom = ({ name, roomId }: EnterRoom) => {
    const socket = io(socketUrl);

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.emit("createRoom", { name, roomId });

    socket.on("createRoomSuccess", (player: Player) => {
      setPlayer(player);
      setPlayerList([{ name: player.name, color: player.color }]);

      roomSocket(socket);

      router.push(`/room/${roomId}`);
    });

    socket.on("createRoomFail", () => {
      alert("이미 존재하는 방입니다.");
    });

    socketRef.current = socket;
  };

  const joinRoom = ({ name, roomId }: EnterRoom) => {
    const socket = io(socketUrl);

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.emit("joinRoom", { name, roomId });

    socket.on(
      "joinRoomSuccess",
      ({ player, playerList }: { player: Player; playerList: PlayerList }) => {
        setPlayer(player);
        setPlayerList(playerList);

        roomSocket(socket);

        router.push(`/room/${roomId}`);
      }
    );

    socket.on("joinRoomFail", ({ type }: { type: "sameName" | "noRoom" }) => {
      if (type === "sameName") {
        alert("이미 존재하는 이름입니다.");
      } else {
        alert("존재하지 않는 방입니다.");
      }
    });

    socketRef.current = socket;
  };

  const ready = () => {
    socketRef.current!.emit("ready");
  };

  const sendMessage = (message: string) => {
    socketRef.current!.emit("sendMessage", {
      name: player!.name,
      message,
      color: player!.color,
    });
  };

  return (
    <GameContext.Provider
      value={{
        isPlaying,
        player,
        playerList,
        deadPlayerList,
        readyPlayerList,
        messageList,
        selectedList,
        //
        createRoom,
        joinRoom,
        ready,
        sendMessage,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGame = () => {
  const game = useContext(GameContext);

  if (!game) {
    throw new Error("useGame must be used within a GameProvider");
  }

  return game;
};

export default useGame;
