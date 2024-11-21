"use client";

import {
  DayAnimationDuration,
  JobInfoDuration,
} from "@/components/molecules/room/animationHelper";
import JobInformationStyle from "./jobInformation.style";
import Image from "next/image";
import { useRoom } from "@/hooks/game/hooks/room/useRoom";
import { playableRoles } from "@/hooks/game/hooks/room/useGameForm";
import useAnimationEnd from "@/hooks/game/hooks/room/useAnimationEnd";

const JobInformation = () => {
  const { me } = useRoom();
  const { role } = me;
  const animationRef = useAnimationEnd<HTMLDivElement>();

  const myRole = playableRoles.find((r) => r.name === role);

  const src = `/assets/playable/${role}.png`;

  return (
    <JobInformationStyle.Container
      $delay={DayAnimationDuration}
      $duration={JobInfoDuration}
      ref={animationRef}
    >
      <JobInformationStyle.Playable>
        <Image src={src} alt={""} width={150} height={150} />
      </JobInformationStyle.Playable>

      <JobInformationStyle.Information>
        <JobInformationStyle.Title>{myRole?.label}</JobInformationStyle.Title>
        <JobInformationStyle.Contents>
          {myRole?.info}
        </JobInformationStyle.Contents>
      </JobInformationStyle.Information>
    </JobInformationStyle.Container>
  );
};

export default JobInformation;
