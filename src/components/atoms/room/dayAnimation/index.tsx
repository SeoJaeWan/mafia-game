"use client";

import { useEffect, useState } from "react";
import DayAnimationStyle from "./dayAnimation.style";
import {
  DayAnimationDuration,
  EventAnimation,
} from "@/components/molecules/room/animationHelper";
import useGame from "@/hooks/game/useGame";
import Image from "next/image";

interface IDayAnimation {
  event: string;
}

const DayAnimation: React.FC<IDayAnimation> = (props) => {
  const { event } = props;
  const [isShow, setIsShow] = useState(false);
  const { time } = useGame();

  const info = time === "night" ? "밤이 되었습니다." : "낮이 되었습니다.";

  useEffect(() => {
    if (event) {
      setTimeout(() => {
        setIsShow(true);
      }, EventAnimation);
    } else {
      setIsShow(true);
    }
  }, [event]);

  useEffect(() => {
    setTimeout(() => {
      setIsShow(false);
    }, DayAnimationDuration);
  });

  return (
    // SVG 작업 필요
    <DayAnimationStyle.Container $isShow={isShow} className={time}>
      <DayAnimationStyle.AnimationBox>
        <Image
          className={"moon"}
          src={"/assets/room/moon.png"}
          alt=""
          width={80}
          height={80}
        />
        <Image
          className={"sun"}
          src={"/assets/room/sun.png"}
          alt=""
          width={100}
          height={100}
        />

        <DayAnimationStyle.Info>{info}</DayAnimationStyle.Info>
      </DayAnimationStyle.AnimationBox>
    </DayAnimationStyle.Container>
  );
};

export default DayAnimation;
