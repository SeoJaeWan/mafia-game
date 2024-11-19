import toRem from "@/styles/utils/toRem";
import styled, { css } from "styled-components";

export interface IButtonStyleProps {
  $isSmall?: boolean;
  $isDisable?: boolean;
  $width?: string;
  $height?: string;
}

const ButtonStyle = styled.button<IButtonStyleProps>`
  ${(props) => props.$width && `width: ${props.$width};`}
  ${(props) => props.$height && `height: ${props.$height};`}

  padding: 10px 20px;

  border: none;
  border-radius: 5px;
  background: var(--gray-background-rgba);

  font-size: ${toRem(20)};
  font-weight: 500;

  cursor: pointer;

  ${(props) =>
    !props.$isDisable &&
    css`
      &:hover {
        background: var(--gray-background-active-rgba);
      }
    `}

  ${(props) =>
    props.$isSmall &&
    css`
      padding: 5px 10px;
      font-size: ${toRem(16)};
    `}
`;

export default ButtonStyle;
