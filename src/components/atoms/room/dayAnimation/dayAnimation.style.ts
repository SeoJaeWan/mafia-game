import styled, { keyframes } from "styled-components";

const show = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const close = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

// 공통 컨테이너 스타일
const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

// Moon 스타일
const Moon = styled.img<{ $isActive: boolean; $duration: number }>`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 80px;
  height: 80px;
  animation: ${(props) => {
      return props.$isActive ? show : close;
    }}
    ${(props) => props.$duration}ms linear forwards;
`;

// Sun 스타일
const Sun = styled.img<{ $isActive: boolean; $duration: number }>`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  animation: ${(props) => (props.$isActive ? show : close)}
    ${(props) => props.$duration}ms linear forwards;
`;

const DayAnimationStyle = {
  Container,
  Moon,
  Sun,
};

export default DayAnimationStyle;
