"use client";

import InputFormStyle from "./inputForm.style";
import { useState } from "react";
import useGame from "@/hooks/useGame";
import GameSetting from "@/components/molecules/room/gameSetting";
import { FaGear } from "react-icons/fa6";

const InputForm = () => {
  // const [showEmoji, setShowEmoji] = useState(false);
  const [input, setInput] = useState("");
  const [isGameSetting, setIsGameSetting] = useState(false);

  const { isPlaying, player, turn, sendMessage } = useGame();

  const getIsChatAble = () => {
    if (!isPlaying) return true;

    if (turn === "discussion" && player!.alive) return true;
    if (turn === "mafiaVote" && player!.role === "mafia") return true;

    return false;
  };

  const isChatAble = getIsChatAble();

  const isOption = player!.isAdmin && !isPlaying;

  // const handleEmojiToggle = () => {
  //   setShowEmoji(!showEmoji);
  // };

  const handleSendChat = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isChatAble || input.trim().length === 0) return;

    sendMessage(input);
    setInput("");
  };

  const handleGameSetting = () => {
    setIsGameSetting((prev) => !prev);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <>
      <InputFormStyle.Container
        onSubmit={handleSendChat}
        $isChatAble={isChatAble}
      >
        <InputFormStyle.Input value={input} onChange={handleChangeInput} />
        {/* {isOption && (
          <InputFormStyle.OptionButton
            type={"button"}
            onClick={handleGameSetting}
          >
            <FaGear size={28} />
          </InputFormStyle.OptionButton>
        )} */}

        {/* <InputFormStyle.EmojiBox $show={showEmoji}></InputFormStyle.EmojiBox> */}

        {/* <InputFormStyle.EmojiButton type={"button"} onClick={handleEmojiToggle}>
        <Image
          src={"/assets/emoji/emoji.png"}
          alt={""}
          width={25}
          height={25}
        />
      </InputFormStyle.EmojiButton> */}
      </InputFormStyle.Container>
      {/* <GameSetting
        isGameSetting={isGameSetting}
        handleGameSetting={handleGameSetting}
      /> */}
    </>
  );
};

export default InputForm;
