import toRem from "@/styles/utils/toRem";
import styled, { keyframes } from "styled-components";

const showAnimation = keyframes`
    0% {
        opacity: 0;
    }
    5% {
        opacity: 1;
    }
    95% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;

interface DurationProps {
  $duration: number;
}

const Container = styled.div<DurationProps>`
  position: absolute;
  z-index: 10;

  animation: ${showAnimation} ${(props) => props.$duration}ms ease-in-out
    forwards;
`;

const FinishContainer = styled(Container)`
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 50px;

  width: 100%;
  height: 100%;

  background-color: var(--white);
`;

const Loser = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: auto;
  height: 80px;

  &:nth-child(1) {
    position: absolute;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
  }

  &:nth-child(2) {
    position: absolute;
    top: -80px;
    left: 50%;
    transform: translateX(50%);
  }

  &:nth-child(3) {
    position: absolute;
    top: -80px;
    left: 50%;
    transform: translateX(-150%);
  }

  &:nth-child(4) {
    position: absolute;
    top: -60px;
    left: 50%;
    transform: translateX(150%);
  }

  &:nth-child(5) {
    position: absolute;
    top: -60px;
    left: 50%;
    transform: translateX(-250%);
  }

  &:nth-child(6) {
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(250%);
  }

  &:nth-child(7) {
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-350%);
  }

  @media (max-width: 768px) {
    height: 73px;
  }
`;

const Winner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: auto;
  height: 100px;

  @media (max-width: 768px) {
    height: 85px;
  }
`;

const JobContainer = styled(Container)`
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  display: flex;
  gap: 10px;

  opacity: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Playable = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 300px;
  height: 300px;

  padding: 10px;

  border-radius: 10px;
  border: 3px solid var(--black);

  background-color: var(--white);
`;

const Information = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 10px;

  width: 300px;
  height: 300px;

  padding: 20px;

  border-radius: 10px;
  border: 3px solid var(--black);

  background-color: var(--white);
`;

const Title = styled.p`
  font-size: ${toRem(24)};
  font-weight: bold;
`;

const Contents = styled.p`
  font-size: ${toRem(18)};
  font-weight: 500;

  white-space: pre-wrap;
  word-break: break-all;
`;

const AnimationHelperStyle = {
  FinishContainer,
  JobContainer,
  Playable,
  Information,
  Title,
  Contents,
  Loser,
  Winner,
};

export default AnimationHelperStyle;
