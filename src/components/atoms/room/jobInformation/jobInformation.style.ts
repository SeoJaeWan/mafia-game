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

interface ContainerProps {
  $delay: number;
  $duration: number;
}

const Container = styled.div<ContainerProps>`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  display: flex;
  gap: 10px;

  opacity: 0;
  animation: ${showAnimation} ${(props) => props.$duration}ms
    ${(props) => props.$delay}ms ease-in-out forwards;

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

const JobInformationStyle = {
  Container,
  Playable,
  Information,
  Title,
  Contents,
};

export default JobInformationStyle;
