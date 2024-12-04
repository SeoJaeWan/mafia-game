"use client";

import Layout from "@/styles/layout";
import InviteStyle from "./invite.style";
import Button from "@/components/atoms/common/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useGame from "@/hooks/useGame";
import GameSetting from "@/components/molecules/room/gameSetting";

const minPlayer = 3;

const Invite = () => {
  const { id } = useParams();
  const [copyUrl, setCopyUrl] = useState("");
  const { player, playerList, readyPlayerList, ready, gameStart } = useGame();

  const isAdmin = player!.isAdmin;
  const isReady = readyPlayerList.includes(player!.name);

  const totalLength = playerList.length;
  const readyLength = readyPlayerList.length;

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

  const handlePlaying = () => {
    if (isAdmin) {
      gameStart();
    } else {
      ready();
    }
  };

  useEffect(() => {
    setCopyUrl(`${window.location.origin}/join/${id}`);
  }, [id]);

  return (
    <InviteStyle.Container>
      <InviteStyle.Box>
        <InviteStyle.Url onClick={handleCopyUrl}>{copyUrl}</InviteStyle.Url>

        <Layout
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"10px"}
        >
          {playable && (
            <InviteStyle.ButtonCover $isActive={isReady}>
              <Button onClick={handlePlaying}>
                {isAdmin ? "시작하기" : "준비"}
              </Button>
            </InviteStyle.ButtonCover>
          )}
        </Layout>
      </InviteStyle.Box>
    </InviteStyle.Container>
  );
};

export default Invite;
