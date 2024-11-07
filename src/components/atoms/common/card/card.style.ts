import toRem from "@/styles/utils/toRem";
import Image from "next/image";
import styled from "styled-components";

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

  border: ${toRem(7)} solid black;
  border-radius: ${toRem(10)};

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

interface IContainerProps {
  $width: number;
}

const Container = styled.div<IContainerProps>`
  width: ${(props) => toRem(props.$width)};
  height: auto;
  aspect-ratio: 63/88;

  &:hover ${Card} {
    transform: rotateY(180deg);
  }
`;

export type CardStyleProps = IContainerProps & ICardScreenProps;

const CardStyle = {
  Container,
  Card,
  Front,
  FrontCard,
  Back,
};

export default CardStyle;
