import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

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
    border-radius: ${toRem(15)} 0 0 ${toRem(15)};
  }

  &.decrease {
    border-radius: 0 ${toRem(15)} ${toRem(15)} 0;
  }

  &:hover {
    background-color: var(--gray-background-active-rgba);
  }
`;

const Number = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 48px;
  height: 24px;

  font-size: ${toRem(18)};
  font-weight: 600;

  background-color: var(--gray-background-rgba);
`;

const CountStyle = {
  Label,
  Button,
  Number,
};

export default CountStyle;
