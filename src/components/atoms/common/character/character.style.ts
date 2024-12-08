import toRem from "@/styles/utils/toRem";
import Image from "next/image";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  position: relative;
  z-index: 2;

  width: auto;
  height: 100%;

  aspect-ratio: 481/617;

  &::after {
    content: "";

    position: absolute;
    bottom: -5px;
    left: 50%;
    z-index: 1;

    transform: translateX(-50%);

    width: 100%;
    height: 20%;

    border-radius: 100%;

    background-color: rgba(0, 0, 0, 0.2);
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
  $mouseAni?: boolean;
}

const Mouse = styled.div<MouseProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;

  display: ${({ $mouseAni }) => ($mouseAni ? "block" : "none")};

  width: 12%;
  height: auto;

  aspect-ratio: 102/97;

  overflow: hidden;

  img {
    position: absolute;
    left: 0;
    top: 0;

    width: 200%;
    height: auto;

    animation: ${mouseAni} 0.5s steps(2) infinite;
  }
`;

const Character = styled(Image)`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
`;

interface ColorProps {
  $color: string;
}

const Name = styled.p<ColorProps>`
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translate(-50%, 100%);

  width: 100%;

  color: ${(props) => props.$color};

  text-align: center;
  font-size: ${toRem(18)};
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: ${toRem(12)};
  }
`;

const CharacterStyle = {
  Container,
  Mouse,
  Character,
  Name,
};

export default CharacterStyle;
