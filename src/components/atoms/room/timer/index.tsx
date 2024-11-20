import useGame from "@/hooks/game/useGame";
import { useEffect, useState } from "react";
import TimerStyle from "./timer.style";

const Timer = () => {
  const { form, turn, discussionFinish } = useGame();
  const [time, setTime] = useState(0);

  const isActive = turn === "discussion";

  useEffect(() => {
    if (isActive) {
      let time = form.getValues("time");

      const interval = setInterval(() => {
        setTime(time--);

        if (time === 0) {
          clearInterval(interval);
          discussionFinish();
          //
        }
      }, 1000);
    }
  }, [isActive]);

  return <TimerStyle $isActive={isActive}>{time}</TimerStyle>;
};

export default Timer;
