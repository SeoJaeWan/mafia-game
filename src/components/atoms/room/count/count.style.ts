import toRem from "@/styles/utils/toRem";
import styled, { css } from "styled-components";

const Label = styled.p`
  width: ${toRem(60)};

  font-size: ${toRem(16)};
  font-weight: 400;

  margin-right: ${toRem(10)};
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 48px;
  height: 24px;

  background-color: var(--gray-background-rgba);
  border: none;

  &.increase {
    border-radius: 0 ${toRem(15)} ${toRem(15)} 0;
  }

  &.decrease {
    border-radius: ${toRem(15)} 0 0 ${toRem(15)};
  }

  &:hover {
    background-color: var(--gray-background-active-rgba);
  }
`;

const Number = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: ${toRem(48)};
  height: ${toRem(24)};

  font-size: ${toRem(18)};
  font-weight: 600;

  background-color: var(--gray-background-rgba);
`;

interface ErrorProps {
  $isError?: boolean;
}

const Value = styled.span<ErrorProps>`
  ${(props) =>
    props.$isError &&
    css`
      text-decoration: line-through;
      color: var(--gray-text);
    `};
`;

const Error = styled.span<ErrorProps>`
  ${(props) => !props.$isError && `display: none`};

  color: var(--red);
`;

const CountStyle = {
  Label,
  Button,
  Number,
  Value,
  Error,
};

export default CountStyle;
