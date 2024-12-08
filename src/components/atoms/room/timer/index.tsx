import { useEffect, useState } from "react";
import TimerStyle from "./timer.style";
import useGame from "@/hooks/useGame";

const Timer = () => {
  const { turn, form } = useGame();
  const [time, setTime] = useState(0);

  const getActive = () => {
    const { killVote, otherVote } = form.getValues();

    if (
      turn === "discussion" ||
      turn === "citizenVote" ||
      turn === "mafiaVote" ||
      turn === "heal"
    ) {
      return killVote;
    } else if (turn === "check") {
      return otherVote;
    } else {
      return 0;
    }
  };

  let active = getActive();

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (active) {
      interval = setInterval(() => {
        setTime(active--);

        if (active === 0) {
          clearInterval(interval);
          // game.discussionFinish();
          //
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval!);
      setTime(0);
    };
  }, [active, turn]);

  return <TimerStyle $isActive={!!time}>{time}</TimerStyle>;
};

export default Timer;
