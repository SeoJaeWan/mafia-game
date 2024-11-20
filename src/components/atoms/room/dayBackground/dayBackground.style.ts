import { Time } from "@/hooks/game/hooks/usePlaying";
import styled from "styled-components";

export interface IDayBackgroundStyleProps {
  $isShow: boolean;
}

export interface IDayBackgroundProps extends IDayBackgroundStyleProps {
  $time: Time;
}

const DayBackgroundStyle = styled.div<IDayBackgroundProps>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${(props) => (props.$isShow ? 1 : 0)};
  visibility: ${(props) => (props.$isShow ? "visible" : "hidden")};

  width: 100%;
  height: 100%;

  background-color: ${(props) =>
    props.$time === "night"
      ? "var(--day-background-night)"
      : "var(--day-background-morning)"};
`;

export default DayBackgroundStyle;
