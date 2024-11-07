import { useForm } from "react-hook-form";

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

export interface IFormValues extends Record<PlayableRoleNames, number> {
  title: string;
  nickname: string;
  total: number;
  time: number;
  mode: PlayModeValues;
}

const createDefaultValues = () => {
  const defaultValues = playableRoles.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.name]: 0,
    }),
    {}
  );

  return {
    title: "",
    nickname: "",
    total: 0,
    time: 40,
    mode: playMode[0] as PlayModeValues,
    ...defaultValues,
  };
};

const useRoomForm = () => {
  const form = useForm<IFormValues>({
    defaultValues: createDefaultValues(),
  });

  return {
    form,
  };
};

export default useRoomForm;
