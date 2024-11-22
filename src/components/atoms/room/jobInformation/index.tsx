"use client";

import {
  DayAnimationDuration,
  JobInfoDuration,
} from "@/components/molecules/room/animationHelper";
import JobInformationStyle from "./jobInformation.style";
import Image from "next/image";
import { useRoom } from "@/hooks/game/hooks/room/useRoom";
import { playableRoles } from "@/hooks/game/hooks/room/useGameForm";

const JobInformation = () => {
  const { myRole, clearEvent } = useRoom();
  const role = playableRoles[myRole];

  const src = `/assets/playable/${role.name}.png`;

  return (
    <JobInformationStyle.Container
      $delay={DayAnimationDuration}
      $duration={JobInfoDuration}
      onAnimationEnd={clearEvent}
    >
      <JobInformationStyle.Playable>
        <Image src={src} alt={""} width={150} height={150} />
      </JobInformationStyle.Playable>

      <JobInformationStyle.Information>
        <JobInformationStyle.Title>{role.label}</JobInformationStyle.Title>
        <JobInformationStyle.Contents>{role.info}</JobInformationStyle.Contents>
      </JobInformationStyle.Information>
    </JobInformationStyle.Container>
  );
};

export default JobInformation;
