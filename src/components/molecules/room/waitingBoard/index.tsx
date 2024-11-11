"use client";

import Layout from "@/styles/layout";
import WaitingBoardStyle from "./waitingBoard.style";
import Title from "@/components/atoms/common/title";
import Button from "@/components/atoms/common/button";
import { IoPeople } from "react-icons/io5";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useGame from "@/hooks/useGame";

const WaitingBoard = () => {
  const { id } = useParams();
  const [copyUrl, setCopyUrl] = useState("");
  const { me, players, readyPlayer } = useGame();

  const totalLength = players.length;
  const readyLength = players.filter((player) => player.isReady).length;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(copyUrl);
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
          <WaitingBoardStyle.WaitingPeople>
            <IoPeople size={24} />
            {readyLength}/{totalLength}
          </WaitingBoardStyle.WaitingPeople>
        </Layout>
        <WaitingBoardStyle.Url onClick={handleCopyUrl}>
          {copyUrl}
        </WaitingBoardStyle.Url>

        <Layout>
          <WaitingBoardStyle.ButtonCover $isActive={me?.isReady}>
            <Button onClick={readyPlayer}>준비 완료</Button>
          </WaitingBoardStyle.ButtonCover>
        </Layout>
      </WaitingBoardStyle.Box>
    </WaitingBoardStyle.Container>
  );
};

export default WaitingBoard;
