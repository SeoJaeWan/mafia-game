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

  width: 60%;

  opacity: 0;
  animation: ${showAnimation} ${(props) => props.$duration}ms
    ${(props) => props.$delay}ms ease-in-out forwards;
`;

const Playable = styled.div`
  padding: 25px 15px;

  border-radius: ${toRem(10)};
  border: 3px solid var(--black);

  background-color: var(--white);
`;

const Information = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;

  padding: 10px;

  border-radius: ${toRem(10)};
  border: 3px solid var(--black);

  background-color: var(--white);
`;

const Title = styled.p`
  font-size: ${toRem(20)};
  font-weight: bold;
`;

const Contents = styled.p`
  font-size: ${toRem(18)};
  font-weight: 500;
`;

const JobInformationStyle = {
  Container,
  Playable,
  Information,
  Title,
  Contents,
};

export default JobInformationStyle;
