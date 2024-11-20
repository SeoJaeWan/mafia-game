"use client";

import {
  DayAnimationDuration,
  JobInfoDuration,
} from "@/components/molecules/room/animationHelper";
import JobInformationStyle from "./jobInformation.style";
import useGame from "@/hooks/game/useGame";
import Image from "next/image";
import { playableRoles } from "@/hooks/game/hooks/useGameModeForm";

const JobInformation = () => {
  const { me } = useGame();
  const { role } = me;

  const myRole = playableRoles.find((r) => r.name === role);

  const src = `/assets/playable/${role}.png`;

  return (
    <JobInformationStyle.Container
      $delay={DayAnimationDuration}
      $duration={JobInfoDuration}
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
