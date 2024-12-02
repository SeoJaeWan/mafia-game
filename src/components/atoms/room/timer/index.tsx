import { useEffect, useState } from "react";
import TimerStyle from "./timer.style";
import useGame from "@/hooks/useGame";

const Timer = () => {
  const { turn, form } = useGame();
  const [time, setTime] = useState(0);

  const isActive = turn === "discussion";

  useEffect(() => {
    if (isActive) {
      let time = form.getValues("time");

      const interval = setInterval(() => {
        setTime(time--);

        if (time === 0) {
          clearInterval(interval);
          // game.discussionFinish();
          //
        }
      }, 1000);
    }
  }, [isActive, form]);

  return <TimerStyle $isActive={isActive}>{time}</TimerStyle>;
};

export default Timer;
