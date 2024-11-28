"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useRef, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
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

export const playableRoles = Object.freeze({
  mafia: {
    label: "마피아",
    name: "mafia",
    info: "마피아는 다른 마피아와 함께 플레이어를 죽이고 살아 남아야 합니다.\n\n마피아가 살아있는 시민의 수와 같아지면 마피아가 승리합니다.",
  },
  citizen: {
    label: "시민",
    name: "citizen",
    info: "시민은 아무런 행동을 하지 않아도 되며, 주변의 행동을 주시하여 마피아를 찾아내야 합니다.\n\n마피아가 모두 죽으면 시민이 승리합니다.",
  },
  police: {
    label: "경찰",
    name: "police",
    info: "경찰은 밤에 한 명의 플레이어를 조사하여 그 플레이어가 마피아인지 아닌지 알아내야 합니다.\n\n경찰은 마피아를 찾아내는 능력을 가지고 있으니, 마피아에게 죽이지 않도록 주의해야 합니다.",
  },
  doctor: {
    label: "의사",
    name: "doctor",
    info: "의사는 밤에 한 명의 플레이어를 선택하여 그 플레이어가 마피아에게 죽이지 않도록 해야 합니다.\n\n의사는 마피아에게 죽이지 않도록 하는 능력을 가지고 있으니, 마피아에게 죽이지 않도록 주의해야 합니다.",
  },
} as const);

export const playMode = Object.freeze([
  { label: "동률", value: "even" },
  { label: "난장판", value: "chaos" },
] as const);

export type PlayableRoleNames = keyof typeof playableRoles;
type PlayModeValues = (typeof playMode)[number];

export interface EnterRoom {
  roomId: string;
  name: string;
}

export interface Player {
  name: string;
  color: string;
  role: PlayableRoleNames;
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
  color?: string;
  isSystem?: boolean;
}

export type timePeriod = "morning" | "night";

export type EnterGameType = "create" | "join";
export type EnterGameResType = "sameName" | "noRoom";

export type Turn =
  | "intro" // 시작
  | "mafiaVote" // 마피아 살인 투표
  | "killCitizen" // 시민 살인
  | "healCitizen" // 시민 생존
  | "heal" // 의사 회복
  | "check" // 경찰 조사
  | "discussion" // 토론
  | "citizenVote" // 시민 투표
  | "killMafia" // 투표 결과 사형
  | "safeMafia" // 투표 결과 생존
  | "mafiaWin" // 마피아 승리
  | "citizenWin" // 시민 승리
  | "gameFinish"; // 게임 종료

const socketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_SERVER;

const defaultPlayerRoles = Object.values(playableRoles).reduce(
  (acc, cur) => ({
    ...acc,
    [cur.name]: 0,
  }),
  {}
) as Record<PlayableRoleNames, number>;

export interface ISetting extends Record<PlayableRoleNames, number> {
  mode: PlayModeValues;
  time: number;
}
export type IForm = UseFormReturn<ISetting, any, undefined>;

type GameContextType = {
  isPlaying: boolean;
  player: Player | undefined;
  playerList: PlayerList;
  deadPlayerList: PlayerList;
  readyPlayerList: string[];
  messageList: Message[];
  selectedList: Selected[];
  form: IForm;
  turn: Turn | null;
  timePeriod: timePeriod;
  //
  createRoom: (room: EnterRoom) => void;
  joinRoom: (room: EnterRoom) => void;
  ready: () => void;
  sendMessage: (message: string) => void;
  gameStart: () => void;
  resetPlayable: () => void;
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
  const [turn, setTurn] = useState<Turn | null>(null);
  const [timePeriod, setTimePeriod] = useState<timePeriod>("morning");
  const [animationLoading, setAnimationLoading] = useState(false);

  const systemMessageRef = useRef<Message>();

  const socketRef = useRef<Socket>();

  const form = useForm<ISetting>({
    defaultValues: {
      ...defaultPlayerRoles,
      mode: playMode[0],
      time: 40,
    },
  });

  const router = useRouter();

  const roomSocket = (socket: Socket) => {
    socket.on("playerList", (playerList: PlayerList) => {
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

    socket.on("startGameSuccess", (role: PlayableRoleNames) => {
      setIsPlaying(true);
      setTurn("intro");
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
      setTurn("killCitizen");
    });

    // 마피아 투표 결과 : 시민 사망 회피 (의사 치료)
    socket.on("citizenHeal", () => {
      setTurn("healCitizen");
    });

    // 시민 투표 결과 : 사형
    socket.on("voteKill", (player: ShortPlayer) => {
      setPlayerList((prev) => prev.filter((item) => item.name !== player.name));
      setDeadPlayerList((prev) => [...prev, player]);
      setTurn("killMafia");
    });

    // 시민 투표 결과 : 사형 회피
    socket.on("voteSafe", () => {
      setTurn("safeMafia");
    });

    // 조사 결과 (경찰)
    socket.on("policeResult", (role: string) => {
      setMessageList((prev) => [
        ...prev,
        {
          name: "시스템",
          message: `${role}입니다.`,
          isSystem: true,
        },
      ]);
    });

    socket.on("mafiaWin", () => {
      setTurn("mafiaWin");
    });

    socket.on("citizenWin", () => {
      setTurn("citizenWin");
    });

    socket.on("animationFinishSuccess", () => {
      setTurn((prev) => {
        // 마피아 작업
        if (prev === "killCitizen") {
          setTimePeriod("morning");
          return "discussion";
        }

        if (prev === "healCitizen") {
          setTimePeriod("morning");
          return "discussion";
        }

        // 시민 작업
        if (prev === "killMafia") {
          setTimePeriod("night");
          return "mafiaVote";
        }

        if (prev === "safeMafia") {
          setTimePeriod("night");
          return "mafiaVote";
        }

        setMessageList((prev) => [
          ...prev,
          {
            name: "시스템",
            message: systemMessageRef.current!.message,
          },
        ]);

        setAnimationLoading(false);
        return prev;
      });
    });
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

  const gameStart = () => {
    const { time, mode, ...roles } = form.getValues();
    let curRoles = roles;

    const total = playerList.length;
    const totalRoles = Object.values(roles).reduce((acc, cur) => acc + cur, 0);

    if (total !== totalRoles) {
      curRoles = calculatePlayable();
      form.reset({
        ...curRoles,
        mode,
        time,
      });
    }

    socketRef.current!.emit("startGame", curRoles);
  };

  const calculatePlayable = () => {
    const totalPlayers = playerList.length;

    // const politician = totalPlayers >= 6 ? 1 : 0;
    const politician = 0;
    const police = totalPlayers >= 8 ? 1 : 0;
    const doctor = totalPlayers >= 8 ? 1 : 0;

    const mafia = Math.ceil(totalPlayers / 6);
    const citizen = totalPlayers - mafia - politician - police - doctor;

    return {
      mafia,
      citizen,
      police,
      doctor,
      politician,
    };
  };

  const resetPlayable = () => {
    const { mafia, citizen, police, doctor, politician } = calculatePlayable();

    form.setValue("mafia", mafia);
    form.setValue("citizen", citizen);
    form.setValue("police", police);
    form.setValue("doctor", doctor);
    // form.setValue("politician", politician);
  };

  const animationFinish = () => {
    socketRef.current!.emit("animationFinish");
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
        form,
        turn,
        timePeriod,
        animationLoading,
        //
        createRoom,
        joinRoom,
        ready,
        sendMessage,
        gameStart,
        resetPlayable,
        animationFinish,
        setAnimationLoading,
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
