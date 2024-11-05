import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

export interface IInputStyleProps {
  $width?: string;
  $height?: string;
}

const InputStyle = styled.input<IInputStyleProps>`
  width: ${(props) => props.$width || "100%"};
  height: ${(props) => props.$height || "100%"};

  padding: 0 ${toRem(10)};

  background-color: var(--gray-background-rgba);

  border: 3px solid transparent;
  border-radius: ${toRem(5)};
  outline: none;

  font-size: ${toRem(20)};

  &::placeholder {
    color: var(--gray-text);
  }

  &:hover {
    border: 3px solid var(--gray-background-active-rgba);
  }

  &:focus {
    background-color: var(--gray-background-active-rgba);
    border: 3px solid var(--gray-background-active-rgba);
  }
`;

export default InputStyle;
