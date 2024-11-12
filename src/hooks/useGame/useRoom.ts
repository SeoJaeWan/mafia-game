import React, { useEffect, useState } from "react";
import Game from "./game";
import { useRouter } from "next/navigation";

export interface IChats {
  name: string;
  message: string;
  isMe?: boolean;
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
  chats: IChats[];
  response: IResponse;
}

const useRoom = (game: Game): IUseRoom => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [chats, setChats] = useState<IChats[]>([]);
  const [response, setResponse] = useState<IResponse>({
    name: "",
    res: false,
  });
  const router = useRouter();

  useEffect(() => {
    game.setRoom({
      setChats,
      setResponse,
      setIsPlaying,
    });
  }, []);

  useEffect(() => {
    const id = game.roomId;

    if (response.name === "join") {
      if (response.res) {
        router.push(`/room/${id}`);
      } else {
        alert("방 참가에 실패했습니다.");
      }
    }

    if (response.name === "create") {
      if (response.res) {
        router.push(`/room/${id}`);
      } else {
        alert("방 생성에 실패했습니다.");
      }
    }
  }, [response]);

  useEffect(() => {
    if (!game.roomId) {
      router.push("/");
    }
  }, []);

  return {
    isPlaying,
    chats,
    response,
  };
};

export default useRoom;
