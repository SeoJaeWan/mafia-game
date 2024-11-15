"use client";

import Button from "@/components/atoms/common/button";
import Input from "@/components/atoms/common/input";
import toRem from "@/styles/utils/toRem";
import InputFormStyle from "./inputForm.style";

import { useState } from "react";
import useGame from "@/hooks/useGame";

const InputForm = () => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [input, setInput] = useState("");

  const { isPlaying, me, turn, chat } = useGame();

  const getIsChatAble = () => {
    if (!isPlaying) return true;
    if (turn === "kill" && me && me.role === "mafia") return true;

    return false;
  };

  const isChatAble = getIsChatAble();

  const handleEmojiToggle = () => {
    setShowEmoji(!showEmoji);
  };

  const handleSendChat = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isChatAble || input.trim().length === 0) return;

    chat(input);
    setInput("");
  };

  return (
    <InputFormStyle.Container
      onSubmit={handleSendChat}
      $isChatAble={isChatAble}
    >
      <Input
        flex={"1"}
        height={toRem(30)}
        value={input}
        onChange={setInput}
        isDisable={!isChatAble}
      />

      <InputFormStyle.EmojiBox $show={showEmoji}></InputFormStyle.EmojiBox>

      {/* <InputFormStyle.EmojiButton type={"button"} onClick={handleEmojiToggle}>
        <Image
          src={"/assets/emoji/emoji.png"}
          alt={""}
          width={25}
          height={25}
        />
      </InputFormStyle.EmojiButton> */}
      <Button
        width={48}
        height={30}
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
