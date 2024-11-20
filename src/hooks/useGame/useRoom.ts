import { useEffect, useState } from "react";
import Game from "./game";
import { usePathname, useRouter } from "next/navigation";
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

export type ResponseMap = {
  enterRoom: { name: string; players: IPlayer[] };
  ready: { players: IPlayer[] };
  gameStart: { role: PlayableRoleNames; players: IPlayer[] };
  animationFinish: {};
  selectUser: { selector: string; name: string };
  message: { name: string; message: string };
  vote: { name: string; players: IPlayer[] };
  heal: { name: string };
  check: { role: PlayableRoleNames };
  kill: { name: string; players: IPlayer[] };
  gameFinish: { name: string; state: GameFinish };
  discussion: {};
};

export interface IResponse<T extends keyof ResponseMap> {
  name: string;
  res: ResponseMap[T];
}

type TurnSequence = Partial<Record<Turn, Turn>>;

const day1: TurnSequence = {
  "": "intro",
  intro: "kill",
  kill: "일반인 사망",
};

const day2: TurnSequence = {
  "일반인 사망": "discussion",
  discussion: "vote",
  vote: "마피아 사망",
  "마피아 사망": "heal",
  heal: "check",
  check: "kill",
  kill: "discussion",
};

export type Time = "night" | "morning";
export type Turn =
  | ""
  | "intro"
  | "kill" // 채팅 설명
  | "heal" // 채팅 설명
  | "check" // 채팅 설명
  | "discussion" // 채팅 설명
  | "vote" // 채팅 설명
  | "마피아 사망"
  | "일반인 사망"
  | "mafiaWin"
  | "citizenWin"
  | "politicianWin";

export type GameFinish = "0" | "1" | "2";

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
  const [response, setResponse] = useState<IResponse<keyof ResponseMap> | null>(
    null
  );
  const [time, setTime] = useState<Time>("night");
  const [turn, setTurn] = useState<Turn>("");
  const [day, setDay] = useState(0);
  const [selectedUsers, setSelectedUsers] = useState(new Map<string, string>());
  const [selected, setSelected] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();

  const getIsSelect = () => {
    type SpecificTurns = "kill" | "heal" | "check";

    const allowedRolesByTurn: Record<SpecificTurns, PlayableRoleNames[]> = {
      kill: ["mafia"],
      heal: ["doctor"],
      check: ["police"],
    };

    const allowedRoles = allowedRolesByTurn[turn as SpecificTurns] || [];

    if ((!isDie && turn === "vote") || allowedRoles.includes(me.role)) {
      return true;
    }

    return false;
  };

  const isDie = players.find((player) => player.name === me.name)?.isDie;
  const isSelect = getIsSelect();

  const initGame = () => {
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

  const systemMessage = (nextTurn: Turn) => {
    if (nextTurn === "kill") {
      setChats((prev) => [
        ...prev,
        {
          name: "알림",
          message: "마피아가 살인을 시작합니다.",
          isSystem: true,
        },
      ]);
    }

    if (nextTurn === "discussion") {
      setChats((prev) => [
        ...prev,
        {
          name: "알림",
          message: "낮이 되었습니다. 토론을 시작합니다.",
          isSystem: true,
        },
      ]);
    }

    if (nextTurn === "heal") {
      setChats((prev) => [
        ...prev,
        {
          name: "알림",
          message: "의사가 마피아로부터 한 명을 치료합니다.",
          isSystem: true,
        },
      ]);
    }

    if (nextTurn === "check") {
      setChats((prev) => [
        ...prev,
        {
          name: "알림",
          message: "경찰이 마피아로 의심되는 인원을 조사합니다.",
          isSystem: true,
        },
      ]);
    }

    if (nextTurn === "vote") {
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
    systemMessage(nextTurn);
  };

  const animationFinish = () => {
    setIsLoadingFinish(false);
    game.animationFinish();
  };

  const selectUser = (name: string) => {
    game.selectUser(name, turn);
  };

  const chat = (message: string) => {
    game.chat(message, turn);
  };

  const isResponseOfType = <T extends keyof ResponseMap>(
    response: IResponse<keyof ResponseMap> | null,
    name: T
  ): response is IResponse<T> => response?.name === name;

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

    if (isResponseOfType(response, "enterRoom")) {
      router.push(`/room/${id}`);
      const { name, players } = response.res;
      setMe((prev) => ({ ...prev, name }));
      setPlayers(players);
    }

    if (isResponseOfType(response, "ready")) {
      const { players } = response.res;
      setPlayers(players);
    }

    if (isResponseOfType(response, "gameStart")) {
      const { role, players } = response.res;
      setMe((prev) => ({ ...prev, role }));
      setPlayers(players);
      initGame();
    }

    if (isResponseOfType(response, "animationFinish")) {
      setIsLoadingFinish(true);
      updateTurn();
    }

    if (isResponseOfType(response, "selectUser")) {
      const { selector, name } = response.res;
      setSelectedUsers((prev) => new Map([...prev, [selector, name]]));
    }

    if (isResponseOfType(response, "vote")) {
      const { name, players } = response.res;

      if (name) {
        setPlayers(players);
        setChats((prev) => [
          ...prev,
          {
            name: "알림",
            message: `${name}님이 마피아로 투표되었습니다.`,
            isSystem: true,
          },
        ]);
      } else {
        setChats((prev) => [
          ...prev,
          {
            name: "알림",
            message: `투표가 과반수를 넘지 못해 종료되었습니다.`,
            isSystem: true,
          },
        ]);
      }

      updateTurn();
      setSelectedUsers(new Map());
      setSelected("");
    }

    if (isResponseOfType(response, "heal")) {
      const { name } = response.res;

      updateTurn();
      setSelectedUsers(new Map());
      setSelected("");
    }

    if (isResponseOfType(response, "check")) {
      const { role } = response.res;

      setChats((prev) => [
        ...prev,
        {
          name: "알림",
          message: `조사 결과 ${role}입니다.`,
          isSystem: true,
        },
      ]);

      updateTurn();
      setSelectedUsers(new Map());
      setSelected("");
    }

    if (isResponseOfType(response, "kill")) {
      const { name, players } = response.res;

      if (name) {
        setPlayers(players);
        setChats((prev) => [
          ...prev,
          {
            name: "알림",
            message: `${name}님이 마피아에 의해 살해되었습니다.`,
            isSystem: true,
          },
        ]);
      } else {
        setChats((prev) => [
          ...prev,
          {
            name: "알림",
            message: `의사의 치료로 죽어가는 시민이 살았습니다.`,
            isSystem: true,
          },
        ]);
      }

      updateTurn();
      setSelectedUsers(new Map());
      setSelected("");
    }

    if (isResponseOfType(response, "discussion")) {
      updateTurn();
    }

    if (isResponseOfType(response, "gameFinish")) {
      const { state } = response.res;

      const stateTurn = {
        "0": "politicianWin",
        "1": "citizenWin",
        "2": "mafiaWin",
      } as const;

      setTurn(stateTurn[state]);
    }

    if (isResponseOfType(response, "message")) {
      const { name, message } = response.res;

      const chat = {
        name,
        message,
        isMe: name === me.name,
      };

      setChats((prev) => [...prev, chat]);
    }
  }, [response]);

  return {
    players,
    me,
    isSelect,
    isPlaying,
    isLoadingFinish,
    isDie,
    chats,
    response,
    turn,
    time,
    day,
    selectedUsers,
    selected,
    //
    animationFinish,
    selectUser,
    chat,
    setSelected,
    isResponseOfType,
  };
};

export type RoomType = ReturnType<typeof useRoom>;

export default useRoom;
