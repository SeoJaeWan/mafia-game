"use client";
import Image from "next/image";
import CharacterStyle from "./character.style";
import { PropsWithChildren } from "react";

interface CharacterProps extends PropsWithChildren {
  characterRole: string;
  mouseAni?: boolean;
  color?: string;
}

const Character = (props: CharacterProps) => {
  const { characterRole, mouseAni, children } = props;

  return (
    <CharacterStyle.Container>
      <CharacterStyle.Character
        src={`/assets/playable/${characterRole}.png`}
        width={481}
        height={617}
        alt={""}
      />
      <CharacterStyle.Mouse $mouseAni={mouseAni}>
        <Image
          src={"/assets/playable/mouse.png"}
          alt={""}
          width={205}
          height={97}
        />
      </CharacterStyle.Mouse>

      {children && (
        <CharacterStyle.Name $color={props.color!}>
          {children}
        </CharacterStyle.Name>
      )}
    </CharacterStyle.Container>
  );
};

export default Character;
