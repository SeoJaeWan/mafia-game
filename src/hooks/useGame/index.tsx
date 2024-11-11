import { useContext } from "react";
import { GameContext } from "./gameProvider";

const useGame = () => {
  const {
    players,
    chats,
    response,
    //
    createRoom,
    joinRoom,
    leaveRoom,
    chat,
  } = useContext(GameContext);

  return {
    players,
    chats,
    response,
    //
    createRoom,
    joinRoom,
    leaveRoom,
    chat,
  };
};

export default useGame;
