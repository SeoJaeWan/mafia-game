import React, { useEffect, useRef, useState } from "react";
import Game from "./game";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PlayableRoleNames } from "./useGameModeForm";

export interface IPlayer {
  name: string;
  color: string;
  isReady?: boolean;
  isDie?: boolean;
}

interface IMe extends IPlayer {
  role: PlayableRoleNames;
}

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
  res: Record<string, string>;
}

type TurnSequence = Partial<Record<Turn, Turn>>;

const day1: TurnSequence = {
  "": "intro",
  intro: "kill",
  kill: "일반인 사망",
};

const day2: TurnSequence = {
  "일반인 사망": "discussion",
  discussion: "마피아 투표",
  "마피아 투표": "마피아 사망",
  "마피아 사망": "heal",
  heal: "check",
  check: "kill",
  kill: "discussion",
};

const colors = [
  "#f82d39",
  "#2d5165",
  "#b9ab6c",
  "#0c3fb5",
  "#900599",
  "#b57731",
  "#56e616",
  "#913353",
  "#f1d65d",
  "#3e2528",
];

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

const useRoom = (game: Game) => {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [me, setMe] = useState<IMe>({
    name: "",
    color: "",
    isReady: false,
    isDie: false,
    role: "citizen",
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const [chats, setChats] = useState<IChats[]>([]);
  const [response, setResponse] = useState<IResponse>({
    name: "",
    res: {},
  });
  const [time, setTime] = useState<Time>("night");
  const [turn, setTurn] = useState<Turn>("");
  const [day, setDay] = useState(0);
  const [selectedUser, setSelectedUser] = useState(new Map<string, string>());
  const router = useRouter();
  const pathname = usePathname();

  const healPlayer = useRef("");

  const initGame = () => {
    setPlayers((prev) => prev.map((player) => ({ ...player, isDie: false })));
    setTime("night");
    setTurn("intro");
    setDay(1);

    setIsPlaying(true);
    setChats((prev) => [
      ...prev,
      { name: "알림", message: "게임이 시작되었습니다.", isSystem: true },
    ]);
  };

  const updateDay = () => {
    setDay((prev) => {
      const update = prev + 1;

      setTime("morning");
      return update;
    });
  };

  const systemMessage = () => {
    if (turn === "kill") {
      setChats((prev) => [
        ...prev,
        {
          name: "알림",
          message: "마피아가 투표를 시작합니다.",
          isSystem: true,
        },
      ]);
    }

    if (turn === "discussion") {
      setChats((prev) => [
        ...prev,
        {
          name: "알림",
          message: "낮이 되었습니다. 토론을 시작합니다.",
          isSystem: true,
        },
      ]);
    }

    if (turn === "heal") {
      setChats((prev) => [
        ...prev,
        {
          name: "알림",
          message: "의사가 마피아로부터 한 명을 치료합니다.",
          isSystem: true,
        },
      ]);
    }

    if (turn === "check") {
      setChats((prev) => [
        ...prev,
        {
          name: "알림",
          message: "경찰이 마피아로 의심되는 인원을 조사합니다.",
          isSystem: true,
        },
      ]);
    }

    if (turn === "마피아 투표") {
      setChats((prev) => [
        ...prev,
        {
          name: "알림",
          message: "마피아로 의심되는 인원 투표를 시작합니다.",
          isSystem: true,
        },
      ]);
    }
  };

  const updateTurn = () => {
    const dayObj = day === 1 ? day1 : day2;
    const nextTurn = dayObj[turn] as Turn;

    // 마피아가 살인 후 일반인 사망으로 넘어갈 때 day 변경
    if (nextTurn === "일반인 사망") {
      updateDay();

      // night 변경되는 시간 Turn = heal
    } else if (nextTurn === "heal") {
      setTime("night");
    }

    setTurn(nextTurn);

    systemMessage();
  };

  const submitResult = (selectedUser: Map<string, string>) => {
    const mostSelected = selectedUser.entries().reduce((acc, [, value]) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const [user, votes] = Object.entries(mostSelected).reduce(
      (max, entry) => (entry[1] > max[1] ? entry : max),
      ["", -1]
    );

    if (turn === "마피아 투표") {
      if (players.length / 2 < votes) {
        setChats((prev) => [
          ...prev,
          {
            name: "알림",
            message: `${user}님이 투표로 사망하였습니다.`,
            isSystem: true,
          },
        ]);

        setPlayers((prev) =>
          prev.map((player) =>
            player.name === user ? { ...player, isDie: true } : player
          )
        );
      } else {
        setChats((prev) => [
          ...prev,
          {
            name: "알림",
            message: "투표 결과로 아무도 사망하지 않았습니다.",
            isSystem: true,
          },
        ]);
      }
    }

    if (turn === "heal") {
      healPlayer.current = user;
    }

    if (turn === "kill") {
      if (healPlayer.current === user) {
        setChats((prev) => [
          ...prev,
          {
            name: "알림",
            message: "아무 일도 일어나지 않았습니다.",
            isSystem: true,
          },
        ]);
      } else {
        setChats((prev) => [
          ...prev,
          {
            name: "알림",
            message: `${user}님이 마피아에 의해 사망하였습니다.`,
            isSystem: true,
          },
        ]);

        setPlayers((prev) =>
          prev.map((player) =>
            player.name === user ? { ...player, isDie: true } : player
          )
        );
      }

      healPlayer.current = "";
    }
  };
  //
  const animationFinish = () => {
    setIsLoadingFinish(false);
    game.animationFinish();
  };

  const selectUser = (name: string) => {
    type SpecificTurns = "kill" | "heal" | "check";

    const allowedRolesByTurn: Record<SpecificTurns, PlayableRoleNames[]> = {
      kill: ["mafia"],
      heal: ["doctor"],
      check: ["police"],
    };

    const allowedRoles = allowedRolesByTurn[turn as SpecificTurns];

    if (allowedRoles.includes(me.role) || turn === "마피아 투표") {
      game.selectUser(name, me.role);
    }
  };

  const submitUser = () => {
    game.submitUser(selectedUser);
  };

  const chat = (message: string) => {
    game.chat(message, turn);
  };

  useEffect(() => {
    game.setRoom({
      setResponse,
    });
  }, []);

  // 테스트
  useEffect(() => {
    const isRoom = pathname.includes("room");

    if (isRoom && !game.roomId) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const id = game.roomId;

    if (response.name === "enterRoom") {
      router.push(`/room/${id}`);
      const { name } = response.res;
      setMe((prev) => ({ ...prev, name }));
    }

    if (response.name === "gameStart") {
      const { role } = response.res as { role: PlayableRoleNames };
      setMe((prev) => ({ ...prev, role }));
      initGame();
    }

    if (response.name === "animationFinish") {
      setIsLoadingFinish(true);
      updateTurn();
    }

    if (response.name === "selectUser") {
      const { selector, name } = response.res;
      setSelectedUser((prev) => new Map([...prev, [selector, name]]));
    }

    if (response.name === "submitUser") {
      const { selectedUserRaw } = response.res;

      const selectedUser = new Map(JSON.parse(selectedUserRaw)) as Map<
        string,
        string
      >;

      updateTurn();
      setSelectedUser(new Map());
      submitResult(selectedUser);
    }

    if (response.name === "message") {
      const { name, message } = response.res;

      const chat = {
        name,
        message,
        isMe: name === me.name,
      };

      setChats((prev) => [...prev, chat]);
    }

    if (response.name === "ready") {
      const { name } = response.res;

      setPlayers((prev) =>
        prev.map((player) =>
          player.name === name
            ? { ...player, isReady: !player.isReady }
            : player
        )
      );
    }

    if (response.name === "players") {
      const { playersRaw } = response.res;
      const players = JSON.parse(playersRaw) as string[];

      setPlayers((prev) => [
        ...players.map((name, index) => ({
          name,
          color: colors[index],
        })),
      ]);
    }
  }, [response]);

  return {
    players,
    me,
    isPlaying,
    isLoadingFinish,
    chats,
    response,
    turn,
    time,
    day,
    selectedUser,
    //
    animationFinish,
    selectUser,
    submitUser,
    chat,
  };
};

export default useRoom;
