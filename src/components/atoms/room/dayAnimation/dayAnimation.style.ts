import toRem from "@/styles/utils/toRem";
import styled, { keyframes } from "styled-components";

interface IContainer {
  $isShow: boolean;
}

const backgroundAnimation = (isNight: boolean) => keyframes`
  from {
    background-color: ${
      isNight ? "var(--day-background-morning)" : "var(--day-background-night)"
    };
    border-color: ${
      isNight ? "var(--day-background-night)" : "var(--day-background-morning)"
    };
  }

  to {
    background-color: ${
      isNight ? "var(--day-background-night)" : "var(--day-background-morning)"
    };
    border-color: ${
      isNight ? "var(--day-background-morning)" : "var(--day-background-night)"
    };
  }
`;

const openAnimation = keyframes`
  0% {
    opacity: 0;
  }

  50% {
    offset-distance: 35%;
  }

  100% {
    offset-distance: 70%;
    opacity: 1;
  }
`;

const closeAnimation = keyframes`
  0% {
      offset-distance: 70%;
      opacity: 1;
  }
  50% {
    offset-distance: 70%;
    opacity: 0.5;
  }

  100% {
    offset-distance: 100%;
    opacity: 0;
  }
`;

const AnimationBox = styled.div`
  position: relative;

  width: 600px;
  max-width: 100%;
  aspect-ratio: 654/400;

  border-radius: ${toRem(20)};
  border: ${toRem(5)} solid;

  img {
    position: absolute;

    offset-rotate: 0deg;
    /* offset-distance: 0%; */
    offset-path: path("M80,268c136-263,320.21-262.37,445,3");
  }
`;

const Container = styled.div<IContainer>`
  position: absolute;
  top: 0;
  left: 0;

  display: ${(props) => (props.$isShow ? "flex" : "none")};
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  &.night {
    background-color: var(--day-background-morning);
    animation: ${backgroundAnimation(true)} 3s linear forwards;

    ${AnimationBox} {
      border-color: var(--day-background-night);
      background-color: var(--day-background-morning);

      animation: ${backgroundAnimation(true)} 3s linear forwards;
    }

    .moon {
      animation: ${openAnimation} 3s linear forwards;
    }

    .sun {
      animation: ${closeAnimation} 3s linear forwards;
    }
  }

  &.morning {
    background-color: var(--day-background-night);
    animation: ${backgroundAnimation(false)} 3s linear forwards;

    ${AnimationBox} {
      border-color: var(--day-background-morning);
      background-color: var(--day-background-night);

      animation: ${backgroundAnimation(false)} 3s linear forwards;
    }

    .moon {
      animation: ${closeAnimation} 3s linear forwards;
    }

    .sun {
      animation: ${openAnimation} 3s linear forwards;
    }
  }
`;

const Info = styled.p`
  position: absolute;
  bottom: ${toRem(10)};
  left: 50%;

  transform: translateX(-50%);

  background-color: var(--day-background-morning);
  border: ${toRem(2)} solid var(--day-background-night);
  border-radius: ${toRem(10)};

  padding: ${toRem(10)} ${toRem(20)};

  font-size: ${toRem(18)};
  font-weight: 700;
`;

const DayAnimationStyle = {
  Container,
  AnimationBox,
  Info,
};

export default DayAnimationStyle;
