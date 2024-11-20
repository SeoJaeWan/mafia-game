import { createContext, useContext, useEffect, useState } from "react";
import useGame from "../gameProvider";

type Animation =
  | "mafiaKill"
  | "citizenKill"
  | "mafiaWin"
  | "citizenWin"
  | "politicianWin";

export type Events = ("day" | "job" | Animation)[];

const EventContext = createContext<{
  events: Events;
}>({
  events: [],
});

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<Events>([]);
  const { game } = useGame();

  useEffect(() => {
    game.setStateEvent(setEvents);
  }, []);

  return (
    <EventContext.Provider value={{ events }}>{children}</EventContext.Provider>
  );
};

const useEvent = () => {
  const events = useContext(EventContext);

  return events;
};

export default useEvent;
