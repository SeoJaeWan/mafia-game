import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

const SubmitContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const SubmitButton = styled.button`
  width: 200px;
  height: 50px;

  border: none;
  border-radius: 25px;
  background-color: var(--black);
  color: var(--white);

  font-size: ${toRem(18)};
  font-weight: 700;
`;

const SubmitStyle = {
  SubmitContainer,
  SubmitButton,
};

export default SubmitStyle;
