import React, { useEffect, useState } from "react";
import Game from "./game";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface IChats {
  name: string;
  message: string;
  isMe?: boolean;
  isSystem?: boolean;
}

export interface IOptions {
  roomId: string;
  name: string;
}

export interface IResponse {
  name: string;
  res: boolean;
}

export interface IUseRoom {
  isPlaying: boolean;
  isLoadingFinish: boolean;
  chats: IChats[];
  response: IResponse;
  time: Time;
  turn: Turn;
  day: number;
  selectedUser: Map<string, string>;
}

export type Time = "night" | "morning";
export type Turn =
  | ""
  | "intro"
  | "kill" // 채팅 설명
  | "heal" // 채팅 설명
  | "check" // 채팅 설명
  | "discussion" // 채팅 설명
  | "마피아 투표" // 채팅 설명
  | "마피아 사망"
  | "일반인 사망";

const useRoom = (game: Game): IUseRoom => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const [chats, setChats] = useState<IChats[]>([]);
  const [response, setResponse] = useState<IResponse>({
    name: "",
    res: false,
  });
  const [time, setTime] = useState<Time>("night");
  const [turn, setTurn] = useState<Turn>("");
  const [day, setDay] = useState(0);
  const [selectedUser, setSelectedUser] = useState(new Map<string, string>());
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    game.setRoom({
      setChats,
      setResponse,
      setIsPlaying,
      setTime,
      setTurn,
      setDay,
      setIsLoadingFinish,
      setSelectedUser,
    });
  }, []);

  // 테스트
  useEffect(() => {
    const isRoom = pathname.includes("room");

    if (isRoom && !game.roomId) {
      router.push("/");
    }
  }, []);

  return {
    isPlaying,
    isLoadingFinish,
    chats,
    response,
    turn,
    time,
    day,
    selectedUser,
  };
};

export default useRoom;
