"use client";

import Layout from "@/styles/layout";
import WaitingBoardStyle from "./waitingBoard.style";
import Title from "@/components/atoms/common/title";
import Button from "@/components/atoms/common/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useGame from "@/hooks/game/useGame";

const minPlayer = 3;

const WaitingBoard = () => {
  const { id } = useParams();
  const [isGameSetting, setIsGameSetting] = useState(false);
  const [copyUrl, setCopyUrl] = useState("");
  const { player, playerList, readyPlayerList, ready } = useGame();

  const isAdmin = player!.isAdmin;
  const isReady = readyPlayerList.includes(player!.name);

  const totalLength = playerList.length;
  const readyLength = readyPlayerList.length;

  console.log(isAdmin);

  const getShowButton = () => {
    const ablePlayerLength = totalLength >= minPlayer;

    if (isAdmin) {
      const playable = totalLength - 1 === readyLength && ablePlayerLength;

      if (playable) {
        return true;
      }
    } else if (ablePlayerLength) {
      return true;
    }

    return false;
  };

  const playable = getShowButton();

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(copyUrl);
  };

  const handleGameSetting = () => {
    setIsGameSetting((prev) => !prev);
  };

  const handlePlaying = () => {
    if (isAdmin) {
      gameStart();
    } else {
      ready();
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
          {playable && (
            <WaitingBoardStyle.ButtonCover $isActive={isReady}>
              <Button onClick={handlePlaying}>
                {isAdmin ? "시작하기" : "준비"}
              </Button>
            </WaitingBoardStyle.ButtonCover>
          )}
        </Layout>
      </WaitingBoardStyle.Box>

      {/* <GameSetting
        isGameSetting={isGameSetting}
        handleGameSetting={handleGameSetting}
      /> */}
    </WaitingBoardStyle.Container>
  );
};

export default WaitingBoard;
