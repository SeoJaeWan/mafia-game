import toRem from "@/styles/utils/toRem";
import styled, { css } from "styled-components";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 45px;
  height: 24px;

  background-color: var(--gray-background-rgba);
  border: none;

  &.increase {
    border-radius: 0 ${toRem(5)} ${toRem(5)} 0;
  }

  &.decrease {
    border-radius: ${toRem(5)} 0 0 ${toRem(5)};
  }

  &.confirm {
    display: none;
    border-radius: 0 ${toRem(5)} ${toRem(5)} 0;
  }

  &:hover {
    background-color: var(--gray-background-active-rgba);
  }
`;

const Number = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: ${toRem(45)};
  height: ${toRem(24)};

  font-size: ${toRem(14)};
  font-weight: 600;

  border: none;
  background-color: var(--gray-background-rgba);

  &:hover {
    background-color: var(--gray-background-active-rgba);
  }

  cursor: pointer;
`;

const Input = styled.input`
  display: none;

  width: ${toRem(45)};
  height: ${toRem(20)};

  border: none;
  background-color: var(--background);

  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  &:focus {
    outline: none;
  }
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

interface ContainerProps {
  $isInput?: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${toRem(2)};

  ${(props) =>
    props.$isInput &&
    css`
      .count {
        display: none;
      }

      .confirm {
        display: flex;
      }

      ${Number} {
        width: ${toRem(45 + 45 + 2)};

        ${Input} {
          display: block;
        }

        &:hover {
          background-color: var(--gray-background-rgba);
        }
      }
    `};
`;

export type CountStyleProps = ErrorProps & ContainerProps;

const CountStyle = {
  Container,
  Button,
  Number,
  Value,
  Error,
  Input,
};

export default CountStyle;
