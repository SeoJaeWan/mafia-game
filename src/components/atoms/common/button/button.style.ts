import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

const ButtonStyle = styled.button`
  --button-background-rgb: 223, 228, 234;

  padding: ${toRem(10)} ${toRem(20)};

  border: none;
  border-radius: ${toRem(5)};
  background: rgba(var(--button-background-rgb), 0.5);

  font-size: ${toRem(20)};
  font-weight: 500;

  cursor: pointer;

  &:hover {
    background: rgba(var(--button-background-rgb), 1);
  }
`;

export default ButtonStyle;
