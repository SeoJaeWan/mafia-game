import styled from "styled-components";

interface IContainer {
  $isShow: boolean;
}

const Container = styled.div<IContainer>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: ${(props) => (props.$isShow ? "block" : "none")};
`;

const DayAnimationStyle = {
  Container,
};

export default DayAnimationStyle;
