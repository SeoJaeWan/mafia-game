import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

interface SubmitStyleProps {
  $isShow: boolean;
  $isActive: boolean;
}

const SubmitStyle = styled.button<SubmitStyleProps>`
  position: absolute;
  bottom: ${toRem(20)};
  left: 50%;
  transform: translateX(-50%);

  display: ${(props) => (props.$isShow ? "block" : "none")};

  width: ${toRem(200)};
  height: ${toRem(50)};

  border: none;
  border-radius: ${toRem(25)};
  background-color: ${(props) =>
    props.$isActive ? "var(--black)" : "var(--gray)"};
  color: var(--white);

  font-size: ${toRem(18)};
  font-weight: 700;
`;

export default SubmitStyle;
