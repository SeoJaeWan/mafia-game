"use client";

import {
  EventProps,
  JobInfoDuration,
} from "@/components/molecules/room/animationHelper";
import JobInformationStyle from "./jobInformation.style";
import Image from "next/image";
import useGame, { playableRoles } from "@/hooks/useGame";

const JobInformation = (props: EventProps) => {
  const { events, animationEnd } = props;

  const { player } = useGame();

  const role = player!.role;
  const roleInfo = playableRoles[role];

  const src = `/assets/playable/${roleInfo.name}.png`;

  const isShow = events[0] === "job";

  if (!isShow) return null;

  return (
    <JobInformationStyle.Container
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
