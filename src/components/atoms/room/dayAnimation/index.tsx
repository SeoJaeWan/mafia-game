"use client";

import DayAnimationStyle from "./dayAnimation.style";
import Image from "next/image";
import { useRoom } from "@/hooks/game/hooks/room/useRoom";
import useAnimationEnd from "@/hooks/game/hooks/room/useAnimationEnd";
import { DayAnimationDuration } from "@/components/molecules/room/animationHelper";

const DayAnimation: React.FC = () => {
  const { events, time } = useRoom();
  const animationRef = useAnimationEnd<HTMLImageElement>();

  const info = time === "night" ? "밤이 되었습니다." : "낮이 되었습니다.";

  const isShow = events[0] === "day";

  return (
    // SVG 작업 필요
    <DayAnimationStyle.Container
      $isShow={isShow}
      $delay={DayAnimationDuration}
      className={time}
    >
      <DayAnimationStyle.AnimationBox>
        <Image
          className={"moon"}
          src={"/assets/room/moon.png"}
          alt=""
          width={80}
          height={80}
          ref={animationRef}
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
