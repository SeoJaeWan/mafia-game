"use client";

import { useState } from "react";
import useGame from "../../useGame";

export const Animation = [
  "mafiaKill",
  "doctorHeal",
  "citizenKill",
  "citizenSafe",
  "mafiaWin",
  "citizenWin",
  "politicianWin",
];

type AnimationType = (typeof Animation)[number];

export type EventCase =
  | "intro"
  | "kill"
  | "heal"
  | "voteKill"
  | "voteSafe"
  | "mafiaWin"
  | "citizenWin"
  | "politicianWin";

export type Events = ("day" | "job" | AnimationType)[];

const useEvent = () => {
  const { game } = useGame();
  const [events, setEvents] = useState<Events>([]);

  const updateEvent = (eventCase: EventCase) => {
    switch (eventCase) {
      case "intro":
        setEvents(["day", "job"]);
        break;
      case "kill":
        setEvents(["day", "mafiaKill"]);
        break;
      case "heal":
        setEvents(["day", "doctorHeal"]);
        break;
      case "voteKill":
        setEvents(["day", "citizenKill"]);
        break;
      case "voteSafe":
        setEvents(["day", "citizenSafe"]);
        break;
      case "mafiaWin":
        setEvents(["mafiaWin"]);
        break;
      case "citizenWin":
        setEvents(["citizenWin"]);
        break;
      case "politicianWin":
        setEvents(["politicianWin"]);
        break;
    }
  };

  const clearEvent = () => {
    setEvents((prev) => {
      const updatedEvents = [...prev];
      updatedEvents.shift();

      if (updatedEvents.length === 0) {
        game.animationFinish();
      }
      return updatedEvents;
    });
  };

  return { events, updateEvent, clearEvent };
};

export default useEvent;
