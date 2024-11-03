import toRem from "@/styles/utils/toRem";
import styled, { css } from "styled-components";

export interface IButtonStyleProps {
  $isSmall?: boolean;
}

const ButtonStyle = styled.button<IButtonStyleProps>`
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

  ${(props) =>
    props.$isSmall &&
    css`
      padding: ${toRem(5)} ${toRem(10)};
      font-size: ${toRem(16)};
    `}
`;

export default ButtonStyle;
