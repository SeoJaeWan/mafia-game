import DayAnimation from "@/components/atoms/room/dayAnimation";
import DayBackground from "@/components/atoms/room/dayBackground";
import JobInformation from "@/components/atoms/room/jobInformation";
import useGame from "@/hooks/useGame";
import { useEffect, useState } from "react";

// day1 => night : 밤으로 변경 => 애니메이션 & Background 출력 => 애니메이션 5초
//         night : 직업 안내 => 20초 => intro
//         night : 마피아 투표 => Background 사라짐 => day 변경 => kill
// day2 => morning : 아침으로 변경 => 애니메이션 & Background 출력 => discussion
//         morning : 마피아 투표 결과 => background 사라짐 => ?
//         morning : 마피아 죽이는 애니메이션 => ?
//         night : 밤으로 변경 => 애니메이션 & Background 출력
//         night : 의사 선택 => heal
//         night : 경찰 선택 => check
//         night : 마피아 투표 => kill
// 반복

// max : 25초

export const Animation = 5 * 1000;
export const JobInfo = 20 * 1000;

const PlayHelper = () => {
  const { isLoadingFinish, turn, time, day, animationFinish } = useGame();
  const [isShow, setIsShow] = useState(false);

  const firstDay = day === 1;

  useEffect(() => {
    if (isLoadingFinish) {
      setIsShow(false);
    }
  }, [isLoadingFinish]);

  useEffect(() => {
    setIsShow(true);

    const delay = (firstDay ? JobInfo : 0) + Animation;

    setTimeout(() => {
      animationFinish(turn, day);
    }, delay);
  }, [time, day]);

  return (
    <DayBackground isShow={isShow}>
      <DayAnimation key={day} />
      {firstDay && <JobInformation />}
    </DayBackground>
  );
};

export default PlayHelper;
