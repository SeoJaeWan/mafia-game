import { useContext } from "react";
import { GameContext } from "./gameProvider";

const useGame = () => {
  const {
    players,
    chats,
    //
    setOptions,
    joinRoom,
    leaveRoom,
    chat,
  } = useContext(GameContext);

  return {
    players,
    chats,
    //
    setOptions,
    joinRoom,
    leaveRoom,
    chat,
  };
};

export default useGame;
