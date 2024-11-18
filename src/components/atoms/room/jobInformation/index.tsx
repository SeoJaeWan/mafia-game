"use client";

import { Animation } from "@/components/molecules/room/animationHelper";
import JobInformationStyle from "./jobInformation.style";

const JobInformation = () => {
  return (
    <JobInformationStyle.Container $delay={Animation}>
      <div>대충 카드</div>
      <div>대충 설명</div>
    </JobInformationStyle.Container>
  );
};

export default JobInformation;
