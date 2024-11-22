"use client";

import { useEffect, useState } from "react";
import { PlayerStatus } from "./useGameState";
import { GameFinish } from "./useRoom";
import { useParams } from "next/navigation";
import { PlayableRoleNames } from "./useGameForm";
import { EventCase } from "./useEvent";

export interface IResponse<T extends keyof ResponseMap> {
  name: string;
  res: ResponseMap[T];
}

export type ResponseMap = {
  ready: { playerStatuses: PlayerStatus[] };
  gameStart: { role: PlayableRoleNames; playerStatuses: PlayerStatus[] };
  animationFinish: {};
  selectUser: { selector: string; name: string };
  message: { name: string; message: string };
  vote: { name: string; playerStatuses: PlayerStatus[] };
  heal: { name: string };
  check: { role: PlayableRoleNames };
  kill: { name: string; playerStatuses: PlayerStatus[] };
  gameFinish: { name: string; state: GameFinish };
  discussion: {};
  clearGame: {};
};

interface UseResponseProps {
  updatePlayerStatuses: (playerStatuses: PlayerStatus[]) => void;
  updateMyRole: (role: PlayableRoleNames) => void;
  initGame: () => void;
  updateTurn: () => void;
  updateSelectedUsers: (selectedUser: [string, string]) => void;
  clearSelected: () => void;
  sendSystemMessage: (message: string) => void;
  updateEvent: (eventCase: EventCase) => void;
  gameWinAnimation: (state: GameFinish) => void;
  clearGame: () => void;
}

const useResponse = (props: UseResponseProps) => {
  const {
    updatePlayerStatuses,
    updateMyRole,
    initGame,
    updateTurn,
    updateSelectedUsers,
    clearSelected,
    sendSystemMessage,
    updateEvent,
    gameWinAnimation,
    clearGame,
  } = props;
  const { id } = useParams<{ id: string }>();

  const [response, setResponse] = useState<IResponse<keyof ResponseMap> | null>(
    null
  );

  const isResponseOfType = <T extends keyof ResponseMap>(
    response: IResponse<keyof ResponseMap> | null,
    name: T
  ): response is IResponse<T> => response?.name === name;

  useEffect(() => {
    if (id) {
      if (isResponseOfType(response, "ready")) {
        const { playerStatuses } = response.res;
        updatePlayerStatuses(playerStatuses);
      }

      if (isResponseOfType(response, "gameStart")) {
        const { role, playerStatuses } = response.res;
        updateMyRole(role);
        updatePlayerStatuses(playerStatuses);
        initGame();
        updateEvent("intro");
      }

      if (isResponseOfType(response, "animationFinish")) {
        updateTurn();
      }

      if (isResponseOfType(response, "selectUser")) {
        const { selector, name } = response.res;
        updateSelectedUsers([selector, name]);
      }

      if (isResponseOfType(response, "vote")) {
        const { name, playerStatuses } = response.res;

        let message = "";

        if (name) {
          updatePlayerStatuses(playerStatuses);
          updateEvent("voteKill");

          message = `${name}님이 마피아로 투표되었습니다.`;
        } else {
          updateEvent("voteSafe");

          message = `투표가 과반수를 넘지 못해 종료되었습니다.`;
        }

        sendSystemMessage(message);
        clearSelected();
      }

      if (isResponseOfType(response, "heal")) {
        const { name } = response.res;
        clearSelected();
      }

      if (isResponseOfType(response, "check")) {
        const { role } = response.res;

        sendSystemMessage(`조사 결과 ${role}입니다.`);
        clearSelected();
      }

      if (isResponseOfType(response, "kill")) {
        const { name, playerStatuses } = response.res;
        let message = "";

        if (name) {
          updateEvent("kill");

          updatePlayerStatuses(playerStatuses);
          message = `${name}님이 마피아에 의해 살해되었습니다.`;
        } else {
          updateEvent("heal");

          message = `의사의 치료로 죽어가는 시민이 살았습니다.`;
        }

        sendSystemMessage(message);
        clearSelected();
      }

      if (isResponseOfType(response, "discussion")) {
        updateTurn();
      }

      if (isResponseOfType(response, "gameFinish")) {
        const { state } = response.res;

        gameWinAnimation(state);
      }

      if (isResponseOfType(response, "clearGame")) {
        clearGame();
      }
    }
  }, [response, id]);

  return setResponse;
};

export default useResponse;
