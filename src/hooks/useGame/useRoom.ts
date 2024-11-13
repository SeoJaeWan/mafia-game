import React, { useEffect, useState } from "react";
import Game from "./game";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  const pathname = usePathname();

  useEffect(() => {
    game.setRoom({
      setChats,
      setResponse,
      setIsPlaying,
    });
  }, []);

  // useEffect(() => {
  //   const isRoom = pathname.includes("room");

  //   if (isRoom && !game.roomId) {
  //     router.push("/");
  //   }
  // }, []);

  return {
    isPlaying,
    chats,
    response,
  };
};

export default useRoom;
