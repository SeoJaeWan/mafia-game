import styled, { keyframes } from "styled-components";

const showAnimation = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

interface ContainerProps {
  $delay: number;
}

const Container = styled.div<ContainerProps>`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  display: flex;

  width: 60%;

  opacity: 0;
  animation: ${showAnimation} 0.5s ${(props) => props.$delay}ms ease-in-out
    forwards;
`;

const JobInformationStyle = {
  Container,
};

export default JobInformationStyle;
