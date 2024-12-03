"use client";

import Button from "@/components/atoms/common/button";
import Input from "@/components/atoms/common/input";
import InputFormStyle from "./inputForm.style";
import { useState } from "react";
import useGame from "@/hooks/useGame";

const InputForm = () => {
  // const [showEmoji, setShowEmoji] = useState(false);
  const [input, setInput] = useState("");

  const { isPlaying, player, turn, sendMessage } = useGame();

  const getIsChatAble = () => {
    if (!isPlaying) return true;

    if (turn === "discussion" && player!.alive) return true;
    if (turn === "mafiaVote" && player!.role === "mafia") return true;

    return false;
  };

  const isChatAble = getIsChatAble();

  // const handleEmojiToggle = () => {
  //   setShowEmoji(!showEmoji);
  // };

  const handleSendChat = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isChatAble || input.trim().length === 0) return;

    sendMessage(input);
    setInput("");
  };

  return (
    <InputFormStyle.Container
      onSubmit={handleSendChat}
      $isChatAble={isChatAble}
    >
      <Input
        flex={"1"}
        height={"30px"}
        value={input}
        onChange={setInput}
        isDisable={!isChatAble}
      />

      {/* <InputFormStyle.EmojiBox $show={showEmoji}></InputFormStyle.EmojiBox> */}

      {/* <InputFormStyle.EmojiButton type={"button"} onClick={handleEmojiToggle}>
        <Image
          src={"/assets/emoji/emoji.png"}
          alt={""}
          width={25}
          height={25}
        />
      </InputFormStyle.EmojiButton> */}
      <Button
        width={"48px"}
        height={"30px"}
        isSmall
        type={"submit"}
        isDisable={!isChatAble}
      >
        전송
      </Button>
    </InputFormStyle.Container>
  );
};

export default InputForm;
