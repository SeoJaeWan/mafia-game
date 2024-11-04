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

type PlayableRoleNames = (typeof playableRoles)[number]["name"];

export interface IFormValues extends Record<PlayableRoleNames, number> {
  title: string;
  total: number;
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
    total: 0,
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
