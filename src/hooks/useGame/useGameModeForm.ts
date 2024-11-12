import { useForm, UseFormReturn } from "react-hook-form";
import { IPlayers } from "./usePlayers";

export const playableRoles = Object.freeze([
  {
    label: "마피아",
    name: "mafia",
  },
  {
    label: "시민",
    name: "citizen",
  },
  {
    label: "경찰",
    name: "police",
  },
  {
    label: "의사",
    name: "doctor",
  },
  {
    label: "정치인",
    name: "politician",
  },
] as const);

export const playMode = Object.freeze([
  { label: "동률", value: "even" },
  { label: "난장판", value: "chaos" },
] as const);

type PlayableRoleNames = (typeof playableRoles)[number]["name"];
type PlayModeValues = (typeof playMode)[number];

interface IMode extends Record<PlayableRoleNames, number> {
  mode: PlayModeValues;
  time: number;
}

const defaultPlayerRoles = playableRoles.reduce(
  (acc, cur) => ({
    ...acc,
    [cur.name]: 0,
  }),
  {}
) as Record<PlayableRoleNames, number>;

export interface IUseGameModeForm {
  form: UseFormReturn<IMode, any, undefined>;
  //
  resetPlayable: () => void;
}

const useGameModeForm = (players: IPlayers[]): IUseGameModeForm => {
  const form = useForm<IMode>({
    defaultValues: {
      ...defaultPlayerRoles,
      mode: playMode[0],
      time: 40,
    },
  });

  const resetPlayable = () => {
    const totalPlayers = players.length;

    const politician = totalPlayers >= 6 ? 1 : 0;
    const police = totalPlayers >= 8 ? 1 : 0;
    const doctor = totalPlayers >= 8 ? 1 : 0;

    const mafia = Math.ceil(totalPlayers / 6);
    const citizen = totalPlayers - mafia - politician - police - doctor;

    form.setValue("mafia", mafia);
    form.setValue("citizen", citizen);
    form.setValue("police", police);
    form.setValue("doctor", doctor);
    form.setValue("politician", politician);
  };

  return { form, resetPlayable };
};

export default useGameModeForm;
