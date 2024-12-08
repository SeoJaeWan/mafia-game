import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

interface ITimerStyleProps {
  $isActive: boolean;
}

const TimerStyle = styled.p<ITimerStyleProps>`
  position: absolute;
  top: 40px;
  right: 20px;

  display: ${(props) => (props.$isActive ? "block" : "none")};

  font-size: ${toRem(30)};
  font-weight: bold;

  @media (max-width: 768px) {
    top: 100px;
  }
`;

export default TimerStyle;
