"use client";

import Layout from "@/styles/layout";
import InviteStyle from "./invite.style";
import Button from "@/components/atoms/common/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useGame from "@/hooks/useGame";
import { useNoti } from "@/components/atoms/common/noti";

const minPlayer = 4;

const Invite = () => {
  const { id } = useParams();
  const [copyUrl, setCopyUrl] = useState("");
  const { player, playerList, isPlaying, gameStart } = useGame();
  const { addNoti } = useNoti();

  const isAdmin = player.isAdmin;

  const totalLength = playerList.length;

  const getShowButton = () => {
    const ablePlayerLength = totalLength >= minPlayer;

    if (isAdmin && ablePlayerLength) {
      return true;
    }

    return false;
  };

  const playable = getShowButton();

  const handleCopyUrl = () => {
    const textArea = document.createElement("textarea");
    textArea.value = copyUrl;

    document.body.prepend(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
      addNoti("링크가 복사되었습니다.", "info");
    } catch (error) {
      console.error(error);
    } finally {
      textArea.remove();
    }
  };

  useEffect(() => {
    setCopyUrl(`${window.location.origin}/join/${id}`);
  }, [id]);

  if (isPlaying) return null;

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
            <InviteStyle.ButtonCover>
              <Button onClick={gameStart}>시작하기</Button>
            </InviteStyle.ButtonCover>
          )}
        </Layout>
      </InviteStyle.Box>
    </InviteStyle.Container>
  );
};

export default Invite;
