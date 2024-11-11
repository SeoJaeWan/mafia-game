import toRem from "@/styles/utils/toRem";
import styled, { keyframes } from "styled-components";

interface IGameSettingContainerProps {
  $isShow: boolean;
}

const Container = styled.div<IGameSettingContainerProps>`
  position: fixed;
  top: 0;
  right: 0;

  display: ${(props) => (props.$isShow ? "flex" : "none")};
  justify-content: flex-end;

  width: 100vw;
  height: 100vh;

  background-color: var(--shadow);
`;

const Background = styled.button`
  width: 40vw;
  height: 100vh;

  border: none;
  background-color: transparent;

  cursor: pointer;
`;

const OpenAnimation = keyframes`
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0);
  }
`;

const CloseAnimation = keyframes`
    0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(100%);
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 60vw;
  height: 100vh;

  padding: ${toRem(20)} 0;

  background-color: var(--background);

  animation: ${OpenAnimation} 0.3s ease-in-out forwards;

  &.close {
    animation: ${CloseAnimation} 0.3s ease-in-out forwards;
  }
`;

const Title = styled.h3`
  font-size: ${toRem(20)};
  font-weight: 600;
`;

export type IGameSettingStyleProps = IGameSettingContainerProps;

const GameSettingStyle = {
  Container,
  Background,
  Box,
  Title,
};

export default GameSettingStyle;
