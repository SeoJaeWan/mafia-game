"use client";

import DayAnimationStyle from "./dayAnimation.style";
import { DayAnimationDuration } from "@/components/molecules/room/animationHelper";
import useGame from "@/hooks/useGame";

interface DayAnimationProps {
  animationEnd: () => void;
}

const DayAnimation = (props: DayAnimationProps) => {
  const { animationEnd } = props;
  const { timePeriod } = useGame();

  return (
    // SVG 작업 필요
    <DayAnimationStyle.Container>
      <DayAnimationStyle.Moon
        $isActive={timePeriod === "night"}
        $duration={DayAnimationDuration}
        src={"/assets/room/moon.png"}
        alt=""
        width={80}
        height={80}
        onAnimationEnd={animationEnd}
      />
      <DayAnimationStyle.Sun
        $isActive={timePeriod === "morning"}
        $duration={DayAnimationDuration}
        src={"/assets/room/sun.png"}
        alt=""
        width={100}
        height={100}
      />
    </DayAnimationStyle.Container>
  );
};

export default DayAnimation;
