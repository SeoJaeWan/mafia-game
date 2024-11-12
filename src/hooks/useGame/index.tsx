import { useContext } from "react";
import { GameContext } from "./gameProvider";

const useGame = () => {
  const {
    isPlaying,
    isAdmin,
    //
    me,
    players,
    chats,
    response,
    //
    form,
    //
    createRoom,
    joinRoom,
    leaveRoom,
    chat,
    readyPlayer,
    resetPlayable,
  } = useContext(GameContext);

  return {
    isPlaying,
    isAdmin,
    //
    me,
    players,
    chats,
    response,
    //
    form,
    //
    createRoom,
    joinRoom,
    leaveRoom,
    chat,
    readyPlayer,
    resetPlayable,
  };
};

export default useGame;
