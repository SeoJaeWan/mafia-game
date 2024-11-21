import DayAnimation from "@/components/atoms/room/dayAnimation";
import DayBackground from "@/components/atoms/room/dayBackground";
import JobInformation from "@/components/atoms/room/jobInformation";
import Event from "@/components/atoms/room/event";
import { useEffect, useState } from "react";
import useEvent from "@/hooks/game/hooks/room/useEvent";
import { useRoom } from "@/hooks/game/hooks/room/useRoom";

// day1 => night : 밤으로 변경 => 애니메이션 & Background 출력 => 애니메이션 5초
//         night : 직업 안내 => 20초 => intro
//         night : vote => Background 사라짐 => day 변경 => kill
// day2 => morning : 아침으로 변경 => 애니메이션 & Background 출력 => discussion
//         morning : vote 결과 => background 사라짐 => ?
//         morning : 마피아 죽이는 애니메이션 => ?
//         night : 밤으로 변경 => 애니메이션 & Background 출력
//         night : 의사 선택 => heal
//         night : 경찰 선택 => check
//         night : vote => kill
// 반복

// max : 25초

export const DayAnimationDuration = 5 * 1000;
export const JobInfoDuration = 20 * 1000;

export const EventAnimation = 4 * 1000;

const AnimationHelper = () => {
  const { events } = useRoom();

  console.log(events);

  const isShow = events.length !== 0;

  return (
    <DayBackground isShow={isShow}>
      <DayAnimation />
      <Event />
      <JobInformation />
    </DayBackground>
  );
};

export default AnimationHelper;
