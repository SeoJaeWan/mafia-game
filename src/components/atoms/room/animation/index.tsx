import Image from "next/image";
import AnimationStyle from "./animation.style";
import { EventProps } from "@/components/molecules/room/animationHelper";

const animationKind = [
  "citizenKill",
  "citizenSafe",
  "mafiaKill",
  "doctorHeal",
  "mafiaWin",
  "citizenWin",
];

const Animation = (props: EventProps) => {
  const { events, animationEnd } = props;

  const currentShow = events[0];
  const isShow = animationKind.includes(currentShow);

  if (!isShow) return null;

  const AnimationSrc = `/assets/room/event/${currentShow}.png`;

  return (
    <AnimationStyle.Container>
      <AnimationStyle.AnimationBox>
        <Image
          src={AnimationSrc}
          alt={""}
          width={200 * 26}
          height={200}
          onAnimationEnd={animationEnd}
        />
      </AnimationStyle.AnimationBox>
    </AnimationStyle.Container>
  );
};

export default Animation;
