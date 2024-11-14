"use client";

import { useEffect, useState } from "react";
import DayAnimationStyle from "./dayAnimation.style";
import { Animation } from "@/components/molecules/room/playHelper";
import useGame from "@/hooks/useGame";

const DayAnimation = () => {
  const [isShow, setIsShow] = useState(true);
  const { time } = useGame();

  useEffect(() => {
    setTimeout(() => {
      setIsShow(false);
    }, Animation);
  });

  return (
    // SVG 작업 필요
    <DayAnimationStyle.Container $isShow={isShow}>
      {time === "night" ? "밤이 되었습니다" : "아침이 되었습니다"}
    </DayAnimationStyle.Container>
  );
};

export default DayAnimation;
