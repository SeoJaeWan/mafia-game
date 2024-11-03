import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

const ButtonStyle = styled.button`
  padding: ${toRem(10)} ${toRem(20)};

  border: none;
  border-radius: ${toRem(5)};
  background: var(--gray-background-rgba);

  font-size: ${toRem(20)};
  font-weight: 500;

  cursor: pointer;

  &:hover {
    background: var(--gray-background-active-rgba);
  }
`;

export default ButtonStyle;
