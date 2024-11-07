"use client";

import Button from "@/components/atoms/common/button";
import Input from "@/components/atoms/common/input";
import toRem from "@/styles/utils/toRem";
import InputFormStyle from "./inputForm.style";
import Image from "next/image";
import { useState } from "react";

const InputForm = () => {
  const [showEmoji, setShowEmoji] = useState(false);

  const handleEmojiToggle = () => {
    setShowEmoji(!showEmoji);
  };

  return (
    <InputFormStyle.Container>
      <Input flex={"1"} height={toRem(30)} value={""} onChange={() => {}} />

      <InputFormStyle.EmojiBox show={showEmoji}></InputFormStyle.EmojiBox>

      {/* <InputFormStyle.EmojiButton type={"button"} onClick={handleEmojiToggle}>
        <Image
          src={"/assets/emoji/emoji.png"}
          alt={""}
          width={25}
          height={25}
        />
      </InputFormStyle.EmojiButton> */}
      <Button width={48} height={30} isSmall>
        전송
      </Button>
    </InputFormStyle.Container>
  );
};

export default InputForm;
