import JobInformation from "@/components/atoms/room/jobInformation";
import { useState } from "react";
import useGame from "@/hooks/useGame";

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
        return ["job"];
      case "killCitizen":
        return [];
      case "healCitizen":
        return [];
      case "killMafia":
        return [];
      case "safeMafia":
        return [];
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
      {/* <DayAnimation animationEnd={animationEnd} /> */}
      {/* <Animation events={events} animationEnd={animationEnd} /> */}
      <JobInformation events={events} animationEnd={animationEnd} />
    </>
  );
};

export default AnimationHelper;
