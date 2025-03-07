import styled, { keyframes } from "styled-components";
import { Type } from ".";
import toRem from "@/styles/utils/toRem";

const Container = styled.ul`
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  z-index: 9999;
`;

const messagePop = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.1);
  }

  10% {
    opacity: 1;
    transform:translate(-50%, -50%) scale(1.0);
  }

  90% {
    opacity: 1;
    transform:translate(-50%, -50%) scale(1.0);
  }

  100% {
    opacity: 0;
    transform:translate(-50%, -50%) scale(1.1);
  }
`;

interface BoxProps {
  $type: Type;
}

const Box = styled.li<BoxProps>`
  position: absolute;
  left: 50%;
  top: 50%;

  padding: 15px 20px;

  background-color: ${({ $type }) =>
    $type === "error" ? "var(--error)" : "var(--info)"};
  border-radius: 5px;

  font-size: ${toRem(16)};
  font-weight: 700;
  color: var(--white);

  animation: ${messagePop} 2.9s linear forwards;
`;

const NotiStyle = {
  Container,
  Box,
};

export default NotiStyle;
