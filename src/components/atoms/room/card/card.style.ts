import toRem from "@/styles/utils/toRem";
import Image from "next/image";
import styled, { css, keyframes } from "styled-components";

const Card = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  transform-style: preserve-3d;
  transition: transform 0.5s;
`;

const FrontCard = styled(Image)`
  width: 70%;
  height: auto;

  aspect-ratio: 299/427;
`;

interface ICardScreenProps {
  $color: string;
}

const CardScreen = styled.div<ICardScreenProps>`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  border: 7px solid var(--black);
  border-radius: 10px;

  background-color: ${(props) => props.$color};
`;

const Front = styled(CardScreen)`
  color: white;

  text-align: center;
  font-size: ${toRem(24)};
  font-weight: 700;
`;

const Back = styled(CardScreen)`
  transform: rotateY(180deg);
`;

const showAnimation = keyframes`
  from {
    transform: rotateY(180deg);
  }

  to {
    transform: rotateY(0deg);
  }
`;

interface IContainerProps {
  $isClick: boolean;
}

const Container = styled.div<IContainerProps>`
  width: 150px;
  height: auto;
  aspect-ratio: 63/88;

  background-color: transparent;
  border: none;

  ${(props) =>
    props.$isClick &&
    css`
      transform: scale(1.1);
    `}

  &.animation {
    ${Card} {
      animation: ${showAnimation} 2s;
    }
  }

  &:hover ${Card} {
    transform: rotateY(180deg);
  }
`;

export type CardStyleProps = ICardScreenProps;

const CardStyle = {
  Container,
  Card,
  Front,
  FrontCard,
  Back,
};

export default CardStyle;
