import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

interface ITimerStyleProps {
  $isActive: boolean;
}

const TimerStyle = styled.p<ITimerStyleProps>`
  position: absolute;
  top: 10px;
  right: 10px;

  display: ${(props) => (props.$isActive ? "block" : "none")};

  font-size: ${toRem(30)};
  font-weight: bold;
`;

export default TimerStyle;
