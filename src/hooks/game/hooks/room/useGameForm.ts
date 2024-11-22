"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import useGame from "../../useGame";

export const playableRoles = Object.freeze({
  mafia: {
    label: "마피아",
    name: "mafia",
    info: "마피아는 다른 마피아와 함께 플레이어를 죽이고 살아 남아야 합니다.",
  },
  citizen: {
    label: "시민",
    name: "citizen",
    info: "시민은 아무런 행동을 하지 않아도 되며, 주변의 행동을 주시하여 마피아를 찾아내야 합니다.",
  },
  police: {
    label: "경찰",
    name: "police",
    info: "경찰은 밤에 한 명의 플레이어를 조사하여 그 플레이어가 마피아인지 아닌지 알아내야 합니다.",
  },
  doctor: {
    label: "의사",
    name: "doctor",
    info: "의사는 밤에 한 명의 플레이어를 선택하여 그 플레이어가 마피아에게 죽이지 않도록 해야 합니다.",
  },
  politician: {
    label: "정치인",
    name: "politician",
    info: "정치인은 낮에 투표를 진행할 때 당선되면 게임을 승리합니다.",
  },
} as const);

export const playMode = Object.freeze([
  { label: "동률", value: "even" },
  { label: "난장판", value: "chaos" },
] as const);

export type PlayableRoleNames = keyof typeof playableRoles;
type PlayModeValues = (typeof playMode)[number];

export interface ISetting extends Record<PlayableRoleNames, number> {
  mode: PlayModeValues;
  time: number;
}

const defaultPlayerRoles = Object.values(playableRoles).reduce(
  (acc, cur) => ({
    ...acc,
    [cur.name]: 0,
  }),
  {}
) as Record<PlayableRoleNames, number>;

export type IForm = UseFormReturn<ISetting, any, undefined>;

const useGameForm = () => {
  const form = useForm<ISetting>({
    defaultValues: {
      ...defaultPlayerRoles,
      mode: playMode[0],
      time: 40,
    },
  });

  const { players } = useGame();

  const calculatePlayable = () => {
    const totalPlayers = players.length;

    const politician = totalPlayers >= 6 ? 1 : 0;
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
    form.setValue("politician", politician);
  };

  return {
    form,
    resetPlayable,
    calculatePlayable,
  };
};

export default useGameForm;
