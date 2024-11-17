import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

const TimerStyle = styled.p`
  position: absolute;
  top: ${toRem(10)};
  right: ${toRem(10)};

  font-size: ${toRem(30)};
  font-weight: bold;
`;

export default TimerStyle;
