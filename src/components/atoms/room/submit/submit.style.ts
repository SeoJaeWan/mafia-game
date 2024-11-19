import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

interface SubmitStyleProps {
  $isShow: boolean;
}

const SubmitStyle = styled.button<SubmitStyleProps>`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);

  display: ${(props) => (props.$isShow ? "block" : "none")};

  width: 200px;
  height: 50px;

  border: none;
  border-radius: 25px;
  background-color: var(--black);
  color: var(--white);

  font-size: ${toRem(18)};
  font-weight: 700;
`;

export default SubmitStyle;
