import toRem from "@/styles/utils/toRem";
import Image from "next/image";
import styled, { css, keyframes } from "styled-components";

const Player = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  transform-style: preserve-3d;
  transition: transform 0.5s;
`;

const Character = styled(Image)`
  width: 80%;
  height: auto;

  aspect-ratio: 1/1;
`;

interface NameProps {
  $color: string;
}

const Name = styled.p<NameProps>`
  color: ${(props) => props.$color};

  text-align: center;
  font-size: ${toRem(24)};
  font-weight: 700;
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

  transition: transform 0.5s;

  ${(props) =>
    props.$isClick &&
    css`
      transform: scale(1.05);
    `}

  &.animation {
    ${Player} {
      animation: ${showAnimation} 2s;
    }
  }

  &:hover ${Player} {
    transform: rotateY(180deg);
  }

  @media (max-width: 768px) {
    width: calc((100% - 20px) / 2);
  }
`;

export type PlayerStyleProps = IPlayerScreenProps;

const PlayerStyle = {
  Container,
  Name,
  Character,
};

export default PlayerStyle;
