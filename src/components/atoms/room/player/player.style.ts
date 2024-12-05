import toRem from "@/styles/utils/toRem";
import Image from "next/image";
import styled, { css, keyframes } from "styled-components";

const Character = styled(Image)`
  width: auto;
  height: 100%;

  aspect-ratio: 767/654;
`;

interface ColorProps {
  $color: string;
}

const Name = styled.p<ColorProps>`
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, 100%);

  width: 100%;

  color: ${(props) => props.$color};

  text-align: center;
  font-size: ${toRem(18)};
  font-weight: 700;
`;

interface IContainerProps {
  $isClick: boolean;
}

const Container = styled.div<IContainerProps>`
  width: 100%;
  height: 100%;

  position: relative;

  background-color: transparent;
  border: none;

  transition: transform 0.5s;

  &::after {
    content: "";

    position: absolute;
    bottom: -5px;
    left: 50%;
    z-index: -1;
    transform: translateX(-50%);

    width: 50%;
    height: 20%;

    border-radius: 100%;

    background-color: rgba(0, 0, 0, 0.2);
  }

  ${(props) =>
    props.$isClick &&
    css`
      transform: scale(1.05);
    `}
`;

const MessageList = styled.ul`
  position: absolute;
  left: 15%;
  top: 0;
  transform: translateY(-100%);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;

  width: 120%;
`;

const messagePop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50%);
  }

  30% {
    opacity: 1;
    transform: translateY(0);
  }

  70% {
    opacity: 1;
    transform: translateY(0);
  }

  100% {
    opacity: 0;
    transform: translateY(-50%);
  }
`;

const mouseAni = keyframes`
  from {
   transform: translateX(0);
  }

  to {
    transform: translateX(-100%);
  }
`;

interface MouseProps {
  $mouseAni: boolean;
}

const Mouse = styled.div<MouseProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);

  display: ${(props) => (props.$mouseAni ? "block" : "none")};

  width: 12%;
  height: auto;

  aspect-ratio: 102/97;

  overflow: hidden;

  img {
    width: 200%;
    height: auto;

    animation: ${mouseAni} 0.5s steps(2) infinite;
  }
`;

const Message = styled.li<ColorProps>`
  position: relative;
  padding: 10px;
  border-radius: 5px;

  max-width: 100%;

  color: var(--white);
  background-color: ${(props) => props.$color};

  text-align: left;
  font-size: ${toRem(14)};
  font-weight: 700;

  word-break: break-all;

  animation: ${messagePop} 5s linear forwards;

  &:last-child:before {
    content: "";

    position: absolute;
    bottom: 0;
    left: 10px;
    transform: translateY(85%) rotate(-20deg);

    z-index: 1;

    width: 0;
    height: 0;

    border-left: 6px solid transparent;
    border-right: 6px solid transparent;

    border-top: 12px solid ${(props) => props.$color};
  }

  &:last-child:after {
    content: "";

    position: absolute;
    bottom: 0;
    left: 10px;
    transform: translateY(85%) rotate(-20deg);

    width: 0;
    height: 0;

    border-left: 6px solid transparent;
    border-right: 6px solid transparent;

    border-top: 12px solid ${(props) => props.$color};
  }
`;

export type PlayerStyleProps = ColorProps;

const PlayerStyle = {
  Container,
  Name,
  Character,
  MessageList,
  Message,
  Mouse,
};

export default PlayerStyle;
