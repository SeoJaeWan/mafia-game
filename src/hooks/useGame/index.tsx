import { useContext } from "react";
import { GameContext } from "./gameProvider";

const useGame = () => {
  const {
    isPlaying,
    //
    me,
    players,
    chats,
    response,
    //
    createRoom,
    joinRoom,
    leaveRoom,
    chat,
    readyPlayer,
  } = useContext(GameContext);

  return {
    isPlaying,
    //
    me,
    players,
    chats,
    response,
    //
    createRoom,
    joinRoom,
    leaveRoom,
    chat,
    readyPlayer,
  };
};

export default useGame;
