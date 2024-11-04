import { Control, useFormContext, useWatch } from "react-hook-form";
import { IFormValues } from "./useRoomForm";

interface IUseRoomFormContext {
  control: Control<IFormValues>;
  totalPlayers: number;
  //
  updateTotalPlayers: () => void;
  resetPlayable: () => void;
}

const useRoomFormContext = (): IUseRoomFormContext => {
  const form = useFormContext<IFormValues>();
  const { control, getValues, setValue } = form;

  const totalPlayers = Math.max(
    Object.values(
      useWatch({
        control,
        name: ["mafia", "citizen", "police", "doctor", "politician"],
      })
    ).reduce((acc, cur) => acc + cur, 0),
    useWatch({ control, name: "total" })
  );

  const updateTotalPlayers = () => {
    const { total } = getValues();

    if (total < totalPlayers) {
      setValue("total", totalPlayers);
    }
  };

  const resetPlayable = () => {
    const politician = totalPlayers >= 6 ? 1 : 0;
    const police = totalPlayers >= 8 ? 1 : 0;
    const doctor = totalPlayers >= 8 ? 1 : 0;

    const mafia = Math.ceil(totalPlayers / 6);
    const citizen = totalPlayers - mafia - politician - police - doctor;

    setValue("mafia", mafia);
    setValue("citizen", citizen);
    setValue("police", police);
    setValue("doctor", doctor);
    setValue("politician", politician);
  };

  return {
    control,
    totalPlayers,
    //
    updateTotalPlayers,
    resetPlayable,
  };
};

export default useRoomFormContext;
