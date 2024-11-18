import { useForm, UseFormReturn } from "react-hook-form";
import Game from "./game";
import { IPlayer } from "./useRoom";

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

export type PlayableRoleNames = (typeof playableRoles)[number]["name"];
type PlayModeValues = (typeof playMode)[number];

export interface IRole {
  role: PlayableRoleNames;
}

export interface ISetting extends Record<PlayableRoleNames, number> {
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
  form: UseFormReturn<ISetting, any, undefined>;
  //
  resetPlayable: () => void;
  gameStart: () => void;
}

const useGameModeForm = (players: IPlayer[], game: Game): IUseGameModeForm => {
  const form = useForm<ISetting>({
    defaultValues: {
      ...defaultPlayerRoles,
      mode: playMode[0],
      time: 40,
    },
  });

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

  const gameStart = () => {
    const { time, mode, ...roles } = form.getValues();
    let curRoles = roles;

    const total = players.length;
    const totalRoles = Object.values(roles).reduce((acc, cur) => acc + cur, 0);

    if (total !== totalRoles) {
      curRoles = calculatePlayable();
      form.reset({
        ...curRoles,
        mode,
        time,
      });
    }

    game.gameStart({
      ...curRoles,
      mode,
      time,
    });
  };

  return { form, resetPlayable, gameStart };
};

export default useGameModeForm;
