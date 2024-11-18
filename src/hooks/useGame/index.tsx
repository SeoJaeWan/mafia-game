import { useContext } from "react";
import { GameContext } from "./gameProvider";

const useGame = () => {
  const game = useContext(GameContext);

  return game;
};

export default useGame;
