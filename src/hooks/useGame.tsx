"use client";
import { useNoti } from "@/components/atoms/common/noti";
import {
  DayAnimationDuration,
  EventAnimation,
  JobInfoDuration,
} from "@/components/molecules/room/animationHelper";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from "react";
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
  role: PlayableRoleNames;
  alive: boolean;
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
  time: number;
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

console.log(socketUrl);

const defaultPlayerRoles = Object.values(playableRoles).reduce(
  (acc, cur) => ({
    ...acc,
    [cur.name]: 0,
  }),
  {}
) as Record<PlayableRoleNames, number>;

export interface ISetting extends Record<PlayableRoleNames, number> {
  mode: PlayModeValues;
  killVote: number;
  citizenVote: number;
  otherVote: number;
}

type GameContextType = {
  isPlaying: boolean;
  isChatAble: boolean;
  socket: Socket | null;
  player: Player;
  playerList: PlayerList;
  messageList: Message[];
  selectedList: Selected[];
  turn: Turn | null;
  timePeriod: timePeriod;
  form: UseFormReturn<ISetting>;
  //
  createRoom: (room: EnterRoom) => void;
  joinRoom: (room: EnterRoom) => void;
  sendMessage: (message: string) => void;
  gameStart: () => void;
  resetPlayable: () => void;
  selectPlayer: (name: string) => void;
  gameLeave: () => void;
};

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export interface IGameProviderProps {
  children: React.ReactNode;
}

export const GameProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const { addNoti } = useNoti();

  const [player, setPlayer] = useState<Player>({} as Player);
  const [playerList, setPlayerList] = useState<PlayerList>([]);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [selectedList, setSelectedList] = useState<Selected[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [turn, setTurn] = useState<Turn | null>(null);
  const [timePeriod, setTimePeriod] = useState<timePeriod>("morning");

  const socketRef = useRef<Socket | null>(null);

  const form = useForm<ISetting>({
    defaultValues: {
      ...defaultPlayerRoles,
      mode: playMode[0],
      killVote: 10,
      citizenVote: 10,
      otherVote: 10,
    },
  });

  const getIsChatAble = () => {
    if (!isPlaying) return true;

    if (turn === "discussion" && player.alive) return true;
    if (turn === "mafiaVote" && player.role === "mafia") return true;

    return false;
  };

  const isChatAble = getIsChatAble();

  const router = useRouter();

  const setSystemMessage = (message: string) => {
    setMessageList((prev) => [
      ...prev,
      {
        name: "시스템",
        message,
        isSystem: true,
        time: Date.now(),
      },
    ]);
  };

  const gameFinish = () => {
    setIsPlaying(false);
    setTimePeriod("morning");
    setTurn(null);
  };

  const roomSocket = (socket: Socket, isAdmin: boolean) => {
    const delayStart = (time: number) => {
      if (isAdmin) {
        socket.emit("delayStart", time);
      }
    };

    socket.on("playerList", (playerList: PlayerList) => {
      setPlayerList(playerList);
    });

    socket.on("getMessage", (message: Message) => {
      setMessageList((prev) => [...prev, message]);
    });

    socket.on(
      "startGameSuccess",
      ({
        role,
        colleague,
      }: {
        role: PlayableRoleNames;
        colleague: string[];
      }) => {
        setIsPlaying(true);
        setTurn("intro");
        setTimePeriod("night");

        delayStart(JobInfoDuration);

        setSystemMessage("게임이 시작되었습니다.");
        setPlayer((prev) => ({ ...(prev as Player), role, alive: true }));
        setPlayerList((prev) =>
          prev.map((item) => ({
            ...item,
            role: colleague.includes(item.name) ? role : "citizen",
            alive: true,
          }))
        );
      }
    );

    socket.on("selectPlayerSuccess", (selected?: Selected) => {
      if (selected)
        setSelectedList((prev) => {
          const updated = [...prev];
          const findIndex = updated.findIndex(
            (item) => item.selector === selected.selector
          );

          if (findIndex === -1) {
            return [...updated, selected];
          } else if (updated[findIndex].name === selected.name) {
            updated.splice(findIndex, 1);
          } else {
            updated[findIndex] = selected;
          }

          return updated;
        });
    });

    // 마피아 투표 결과 : 시민 사망
    socket.on("citizenDie", (playerName: string) => {
      setPlayerList((prev) =>
        prev.map((item) => ({
          ...item,
          alive: item.name === playerName ? false : item.alive,
        }))
      );

      setPlayer((prev) => {
        if (prev.name === playerName) {
          return { ...prev, alive: false };
        }

        return prev;
      });

      setTurn("killCitizen");
      setTimePeriod("morning");

      delayStart(DayAnimationDuration);

      setSystemMessage(`${playerName}님이 마피아에게 사망하였습니다.`);
    });
    // 마피아 투표 결과 : 시민 살해 실패
    socket.on("citizenSafe", () => {
      setTurn("killCitizen");
      setTimePeriod("morning");

      delayStart(DayAnimationDuration);

      setSystemMessage(`마피아가 살인에 실패하였습니다.`);
    });

    // 마피아 투표 결과 : 시민 사망 회피 (의사 치료)
    socket.on("citizenHeal", () => {
      setTurn("healCitizen");
      setTimePeriod("morning");

      delayStart(DayAnimationDuration);

      setSystemMessage(`의사의 노력으로 아무 일도 일어나지 않았습니다.`);
    });

    // 시민 투표 결과 : 사형
    socket.on("voteKill", (playerName: string) => {
      setPlayerList((prev) =>
        prev.map((item) => ({
          ...item,
          alive: item.name === playerName ? false : item.alive,
        }))
      );
      setTurn("killMafia");
      setTimePeriod("night");

      delayStart(DayAnimationDuration);

      setPlayer((prev) => {
        if (prev.name === playerName) {
          return { ...prev, alive: false };
        }

        return prev;
      });

      setSystemMessage(`${playerName}님이 시민 투표로 사형되었습니다`);
    });

    // 시민 투표 결과 : 사형 회피
    socket.on("voteSafe", () => {
      setTurn("safeMafia");
      setTimePeriod("night");

      delayStart(DayAnimationDuration);

      setSystemMessage(`과반수를 넘기지 못해 아무 일도 일어나지 않았습니다.`);
    });

    // 조사 결과 (경찰)
    socket.on("policeResult", (role?: PlayableRoleNames) => {
      const { killVote } = form.getValues();
      setTurn("heal");

      delayStart(killVote * 1000);

      if (role) {
        const label = playableRoles[role].label;

        setSystemMessage(
          `조사 결과 해당 플레이어의 직업은 ${label}입니다.\n의사는 위험해 보이는 플레이어를 선택해주세요.`
        );
      } else {
        setSystemMessage(`의사는 위험해 보이는 플레이어를 선택해주세요.`);
      }
    });

    // 의사 치료
    socket.on("healSuccess", () => {
      const { killVote } = form.getValues();

      setSystemMessage("마피아는 시민을 살해할 플레이어를 선택해주세요.");
      delayStart(killVote * 1000);

      setTurn("mafiaVote");
    });

    socket.on("mafiaWin", (roles: PlayableRoleNames[]) => {
      setTurn("mafiaWin");

      delayStart(EventAnimation);
      setPlayerList((prev) =>
        prev.map((player, idx) => ({ ...player, role: roles[idx] }))
      );
    });

    socket.on("citizenWin", (roles: PlayableRoleNames[]) => {
      setTurn("citizenWin");

      delayStart(EventAnimation);
      setPlayerList((prev) =>
        prev.map((player, idx) => ({ ...player, role: roles[idx] }))
      );
    });

    socket.on("delayFinish", () => {
      const { getValues } = form;

      const { killVote, citizenVote, otherVote } = getValues();

      setTurn((prev) => {
        if (prev === "intro") {
          delayStart(killVote * 1000);
          setSystemMessage("마피아는 시민을 살해할 플레이어를 선택해주세요.");

          return "mafiaVote";
        }

        if (prev === "discussion") {
          delayStart(killVote * 1000);
          setSystemMessage("마피아로 의심되는 플레이어를 선택해주세요.");

          return "citizenVote";
        }

        // 마피아 작업
        if (prev === "killCitizen") {
          delayStart(citizenVote * 1000);
          setSystemMessage("제한시간 동안 토론을 진행해주세요.");

          return "discussion";
        }

        if (prev === "healCitizen") {
          delayStart(citizenVote * 1000);
          setSystemMessage("제한시간 동안 토론을 진행해주세요.");

          return "discussion";
        }

        // 시민 작업
        if (prev === "killMafia") {
          delayStart(otherVote * 1000);

          setSystemMessage("경찰은 의심가는 플레이어를 선택해주세요.");
          return "check";
        }

        if (prev === "safeMafia") {
          delayStart(otherVote * 1000);

          setSystemMessage("경찰은 의심가는 플레이어를 선택해주세요.");
          return "check";
        }

        if (prev === "check" && isAdmin) {
          socket.emit("check");
        }

        if (prev === "heal" && isAdmin) {
          socket.emit("heal");
        }

        if (prev === "mafiaVote" && isAdmin) {
          socket.emit("mafiaVote");
        }

        if (prev === "citizenVote" && isAdmin) {
          socket.emit("citizenVote");
        }

        if (prev === "mafiaWin" || prev === "citizenWin") {
          gameFinish();
          setPlayerList((prev) =>
            prev.map((player) => ({ ...player, alive: true, role: "citizen" }))
          );

          return null;
        }

        setSelectedList([]);
        return prev;
      });
    });

    socket.on("playerLeave", (name: string) => {
      gameFinish();
      setPlayerList((prev) =>
        prev
          .filter((item) => item.name !== name)
          .map((player) => ({ ...player, alive: true, role: "citizen" }))
      );

      setSystemMessage(`${name}님이 게임을 나갔습니다.`);
    });
  };

  const createRoom = ({ name, roomId }: EnterRoom) => {
    const socket = io(socketUrl);

    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("createRoom", { name, roomId });
    });

    socket.on("createRoomSuccess", (player: Player) => {
      setPlayer(player);
      setPlayerList([
        {
          name: player.name,
          color: player.color,
          alive: true,
          role: "citizen",
        },
      ]);

      roomSocket(socket, true);

      router.push(`/room/${roomId}`);
    });

    socket.on("createRoomFail", () => {
      addNoti("이미 존재하는 방입니다.", "error");
    });

    socketRef.current = socket;
  };

  const joinRoom = ({ name, roomId }: EnterRoom) => {
    const socket = io(socketUrl);

    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("joinRoom", { name, roomId });
    });

    socket.on(
      "joinRoomSuccess",
      ({ player, playerList }: { player: Player; playerList: PlayerList }) => {
        setPlayer(player);
        setPlayerList(playerList);

        roomSocket(socket, false);

        router.push(`/room/${roomId}`);
      }
    );

    socket.on(
      "joinRoomFail",
      ({
        type,
      }: {
        type: "sameName" | "noRoom" | "fullRoom" | "gameStart";
      }) => {
        if (type === "sameName") {
          addNoti("이미 존재하는 이름입니다.", "error");
        } else if (type === "fullRoom") {
          addNoti("최대 인원을 초과했습니다.", "error");
        } else if (type === "gameStart") {
          addNoti("이미 시작된 방입니다.", "error");
        } else {
          addNoti("존재하지 않는 방입니다.", "error");
        }
      }
    );

    socketRef.current = socket;
  };

  const sendMessage = (message: string) => {
    const messageData = {
      name: player.name,
      message,
      color: player.color,
    };

    if (turn === "mafiaVote") {
      socketRef.current!.emit("sendMafiaMessage", messageData);
    } else {
      socketRef.current!.emit("sendMessage", messageData);
    }
  };

  const gameStart = () => {
    const { killVote, citizenVote, otherVote, mode, ...roles } =
      form.getValues();
    let curRoles = roles;

    const total = playerList.length;
    const totalRoles = Object.values(roles).reduce((acc, cur) => acc + cur, 0);

    if (total !== totalRoles) {
      curRoles = calculatePlayable();
      form.reset({
        ...curRoles,
        mode,
        killVote,
        citizenVote,
        otherVote,
      });
    }

    socketRef.current!.emit("startGame", curRoles);
  };

  const selectPlayer = (name: string) => {
    socketRef.current!.emit("selectPlayer", { name, turn });
  };

  const gameLeave = () => {
    socketRef.current!.disconnect();
    socketRef.current = null;
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
    const { mafia, citizen, police, doctor } = calculatePlayable();

    form.setValue("mafia", mafia);
    form.setValue("citizen", citizen);
    form.setValue("police", police);
    form.setValue("doctor", doctor);
    // form.setValue("politician", politician);
  };

  return (
    <GameContext.Provider
      value={{
        isPlaying,
        isChatAble,
        socket: socketRef.current,
        player: player!,
        playerList,
        messageList,
        selectedList,
        form,
        turn,
        timePeriod,
        //
        createRoom,
        joinRoom,
        sendMessage,
        gameStart,
        resetPlayable,
        selectPlayer,
        gameLeave,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGame = () => {
  const game = useContext(GameContext);

  if (!game) {
    throw new Error("useGame must be used within a ");
  }

  return game;
};

export default useGame;
