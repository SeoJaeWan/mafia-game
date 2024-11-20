import styled, { keyframes } from "styled-components";

interface IContainer {
  $isShow: boolean;
}

const Container = styled.div<IContainer>`
  display: ${(props) => (props.$isShow ? "block" : "none")};

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

const EventStyle = {
  Container,
  AnimationBox,
};

export default EventStyle;
