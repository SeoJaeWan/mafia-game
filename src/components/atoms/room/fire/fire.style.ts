import styled, { keyframes } from "styled-components";

const moving = keyframes`
    100% {
      transform: translateX(-960px);
    }
`;

const Container = styled.div`
  width: 120px;
  height: 120px;

  overflow: hidden;

  img {
    animation: ${moving} 4s steps(8) infinite;
  }
`;

const FireStyle = {
  Container,
};

export default FireStyle;
