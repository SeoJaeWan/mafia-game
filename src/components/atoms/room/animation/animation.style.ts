import styled, { keyframes } from "styled-components";

const Container = styled.div`
  display: block;

  padding: 20px;

  border: 2px solid var(--day-background-morning);
  border-radius: 20px;
`;

const moving = keyframes`
    100% {
      transform: translateX(-5200px);
    }
`;

const AnimationBox = styled.div`
  width: 200px;
  height: 200px;

  overflow: hidden;

  img {
    animation: ${moving} 4s steps(26) forwards;
  }
`;

const AnimationStyle = {
  Container,
  AnimationBox,
};

export default AnimationStyle;
