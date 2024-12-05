import DayAnimation from "@/components/atoms/room/dayAnimation";
import JobInformation from "@/components/atoms/room/jobInformation";
import { useState } from "react";
import useGame from "@/hooks/useGame";
import Animation from "@/components/atoms/room/animation";

export interface EventProps {
  events: string[];
  //
  animationEnd: () => void;
}

export const DayAnimationDuration = 3 * 1000;
export const JobInfoDuration = 10 * 1000;

export const EventAnimation = 4 * 1000;

const AnimationHelper = () => {
  const { turn } = useGame();

  const getAnimation = () => {
    switch (turn) {
      case "intro":
        return ["day", "job"];
      case "killCitizen":
        return ["day", "mafiaKill"];
      case "healCitizen":
        return ["day", "doctorHeal"];
      case "killMafia":
        return ["day", "citizenKill"];
      case "safeMafia":
        return ["day", "citizenSafe"];
      case "mafiaWin":
        return ["mafiaWin"];
      case "citizenWin":
        return ["citizenWin"];
      default:
        return [];
    }
  };

  const [events, setEvents] = useState<string[]>(getAnimation());

  const animationEnd = () => {
    const updatedEvents = [...events];
    updatedEvents.shift();

    setEvents(updatedEvents);
  };

  return (
    <>
      <DayAnimation animationEnd={animationEnd} />
      <Animation events={events} animationEnd={animationEnd} />
      <JobInformation events={events} animationEnd={animationEnd} />
    </>
  );
};

export default AnimationHelper;
