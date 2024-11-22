import toRem from "@/styles/utils/toRem";
import styled, { css } from "styled-components";

export interface IInputStyleProps {
  $flex?: string;
  //
  $width?: string;
  $height?: string;
  //
  $isDisable?: boolean;
}

const InputStyle = styled.input<IInputStyleProps>`
  flex: ${(props) => props.$flex || "initial"};

  width: 100%;

  padding: 8px 10px;

  background-color: var(--gray-background-rgba);

  border: 3px solid transparent;
  border-radius: 5px;
  outline: none;

  font-size: ${toRem(20)};

  &::placeholder {
    color: var(--gray-text);
  }

  ${(props) =>
    !props.$isDisable &&
    css`
      &:hover {
        border: 3px solid var(--gray-background-active-rgba);
      }

      &:focus {
        background-color: var(--gray-background-active-rgba);
        border: 3px solid var(--gray-background-active-rgba);
      }
    `}
`;

export default InputStyle;
