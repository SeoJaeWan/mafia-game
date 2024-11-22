"use client";

import Layout from "@/styles/layout";
import WaitingBoardStyle from "./waitingBoard.style";
import Title from "@/components/atoms/common/title";
import Button from "@/components/atoms/common/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import GameSetting from "@/components/molecules/create/gameSetting";
import { useRoom } from "@/hooks/game/hooks/room/useRoom";
import useGame from "@/hooks/game/useGame";

const WaitingBoard = () => {
  const { id } = useParams();
  const [isGameSetting, setIsGameSetting] = useState(false);
  const [copyUrl, setCopyUrl] = useState("");
  const { game, players, isAdmin, playerNumber } = useGame();
  const { gameStart } = useRoom();

  const isReady = players[playerNumber].isReady;

  const totalLength = players.length - 1;
  const readyLength = players.filter((player) => player.isReady).length;

  const playable = totalLength === readyLength && totalLength > 0 && isAdmin;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(copyUrl);
  };

  const handleGameSetting = () => {
    setIsGameSetting((prev) => !prev);
  };

  const handlePlaying = () => {
    if (isAdmin) {
      if (playable) {
        gameStart();
      }
    } else {
      game.readyPlayer();
    }
  };

  useEffect(() => {
    setCopyUrl(`${window.location.origin}/join/${id}`);
  }, []);

  return (
    <WaitingBoardStyle.Container>
      <WaitingBoardStyle.Box>
        <Layout
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
        >
          <Title>접속 링크</Title>
        </Layout>
        <WaitingBoardStyle.Url onClick={handleCopyUrl}>
          {copyUrl}
        </WaitingBoardStyle.Url>

        <Layout
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"10px"}
        >
          {isAdmin && <Button onClick={handleGameSetting}>게임 설정</Button>}
          {players.length > 2 && (
            <WaitingBoardStyle.ButtonCover $isActive={isReady}>
              <Button onClick={handlePlaying}>
                {playable
                  ? "시작하기"
                  : `준비 ${
                      isReady ? "취소" : "완료"
                    } ${readyLength}/${totalLength}`}
              </Button>
            </WaitingBoardStyle.ButtonCover>
          )}
        </Layout>
      </WaitingBoardStyle.Box>

      <GameSetting
        isGameSetting={isGameSetting}
        handleGameSetting={handleGameSetting}
      />
    </WaitingBoardStyle.Container>
  );
};

export default WaitingBoard;
