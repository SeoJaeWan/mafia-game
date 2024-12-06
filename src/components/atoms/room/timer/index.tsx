import { useEffect, useState } from "react";
import TimerStyle from "./timer.style";
import useGame from "@/hooks/useGame";

const Timer = () => {
  const { turn, form } = useGame();
  const [time, setTime] = useState(0);

  const isActive = turn === "discussion";

  useEffect(() => {
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

    if (active) {
      const interval = setInterval(() => {
        setTime(active--);

        if (active === 0) {
          clearInterval(interval);
          // game.discussionFinish();
          //
        }
      }, 1000);
    }
  }, [turn, form]);

  return <TimerStyle $isActive={isActive}>{time}</TimerStyle>;
};

export default Timer;
