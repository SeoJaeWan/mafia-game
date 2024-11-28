"use client";

import {
  DayAnimationDuration,
  EventProps,
  JobInfoDuration,
} from "@/components/molecules/room/animationHelper";
import JobInformationStyle from "./jobInformation.style";
import Image from "next/image";
import useGame, { playableRoles } from "@/hooks/game/useGame";

const JobInformation = (props: EventProps) => {
  const { animationEnd } = props;

  const { player } = useGame();

  const role = player!.role;

  const roleInfo = playableRoles[role];

  const src = `/assets/playable/${roleInfo.name}.png`;

  return (
    <JobInformationStyle.Container
      $delay={DayAnimationDuration}
      $duration={JobInfoDuration}
      onAnimationEnd={animationEnd}
    >
      <JobInformationStyle.Playable>
        <Image src={src} alt={""} width={240} height={240} />
      </JobInformationStyle.Playable>

      <JobInformationStyle.Information>
        <JobInformationStyle.Title>{roleInfo.label}</JobInformationStyle.Title>
        <JobInformationStyle.Contents>
          {roleInfo.info}
        </JobInformationStyle.Contents>
      </JobInformationStyle.Information>
    </JobInformationStyle.Container>
  );
};

export default JobInformation;
