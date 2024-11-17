import useGame from "@/hooks/useGame";
import { useEffect, useState } from "react";
import TimerStyle from "./timer.style";

const Timer = () => {
  const { form, turn, discussionFinish } = useGame();
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (turn === "discussion") {
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
  }, [turn]);

  return <TimerStyle>{time}</TimerStyle>;
};

export default Timer;
