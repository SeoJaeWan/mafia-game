import toRem from "@/styles/utils/toRem";
import styled, { keyframes } from "styled-components";

const fadeOut = keyframes`
    0% {
        opacity: 0;
    }
    5% {
        opacity: 1;
    }
    95% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;

const Text = styled.p`
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);

  width: 600px;
  padding: 10px;

  border: 3px solid var(--black);
  border-radius: 30px;
  background-color: var(--white);

  font-size: ${toRem(20)};
  font-weight: 700;
  color: var(--black);
  text-align: center;

  animation: ${fadeOut} 5s forwards;
`;

const SystemMessageStyle = {
  Text,
};

export default SystemMessageStyle;
