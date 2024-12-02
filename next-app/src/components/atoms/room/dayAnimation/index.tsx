"use client";

import DayAnimationStyle from "./dayAnimation.style";
import Image from "next/image";
import {
  DayAnimationDuration,
  EventProps,
} from "@/components/molecules/room/animationHelper";
import { useEffect, useRef } from "react";
import useGame from "@/hooks/useGame";

const DayAnimation = (props: EventProps) => {
  const { events, animationEnd } = props;
  const { timePeriod } = useGame();

  const moonRef = useRef<HTMLImageElement | null>(null);
  const sunRef = useRef<HTMLImageElement | null>(null);

  const info = timePeriod === "night" ? "밤이 되었습니다." : "낮이 되었습니다.";

  const isShow = events[0] === "day";

  useEffect(() => {
    const resize = () => {
      if (!moonRef.current || !sunRef.current) return;

      const max = 600;
      const width = window.innerWidth > max ? max : window.innerWidth;

      const ratio = width / max;
      const path = `M${80 * ratio},${268 * ratio}c${136 * ratio}-${
        263 * ratio
      },${320.21 * ratio}-${262.37 * ratio},${445 * ratio},${3 * ratio}`;

      moonRef.current.style.offsetPath = `path("${path}")`;
      sunRef.current.style.offsetPath = `path("${path}")`;
    };

    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    // SVG 작업 필요
    <DayAnimationStyle.Container
      $isShow={isShow}
      $delay={DayAnimationDuration}
      className={timePeriod}
    >
      <DayAnimationStyle.AnimationBox>
        <Image
          ref={moonRef}
          className={"moon"}
          src={"/assets/room/moon.png"}
          alt=""
          width={80}
          height={80}
          onAnimationEnd={animationEnd}
        />
        <Image
          ref={sunRef}
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
