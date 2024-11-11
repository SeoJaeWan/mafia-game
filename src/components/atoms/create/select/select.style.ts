import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

const Option = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  padding: ${toRem(5)} 0;

  font-size: ${toRem(14)};
  font-weight: 600;

  border: none;
  background-color: var(--gray-background-rgba);

  &:hover {
    background-color: var(--gray-background-active-rgba);
  }
`;

const Value = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${toRem(14)};
  font-weight: 600;

  border-radius: ${toRem(5)} 0 0 ${toRem(5)};

  border-top: ${toRem(2)} solid var(--gray-background-active-rgba);
  border-bottom: ${toRem(2)} solid var(--gray-background-active-rgba);
  border-left: ${toRem(2)} solid var(--gray-background-active-rgba);
`;

interface ArrowProps {
  $isShow: boolean;
}

const Arrow = styled.span<ArrowProps>`
  display: ${(props) => (props.$isShow ? "flex" : "none")};
  justify-content: center;
  align-items: center;

  height: 100%;
  aspect-ratio: 1;

  background-color: var(--gray-background-active-rgba);

  border-radius: 0 ${toRem(5)} ${toRem(5)} 0;
  border-top: ${toRem(2)} solid var(--gray-background-active-rgba);
`;

interface OptionContainerProps {
  $isShow: boolean;
}

const OptionContainer = styled.div<OptionContainerProps>`
  position: absolute;
  top: ${`calc(100% - ${toRem(2)})`};
  left: 0;

  display: ${(props) => (props.$isShow ? "block" : "none")};

  width: 100%;

  overflow: hidden;

  border: ${toRem(2)} solid var(--gray-background-active-rgba);

  border-radius: ${toRem(5)};
`;

interface IButtonProps {
  $width: string;
  $height: string;
}

const Button = styled.button<IButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${(props) => props.$width};
  height: ${(props) => props.$height};

  background-color: var(--gray-background-rgba);

  border-radius: ${toRem(5)};
  border: none;

  ${Value} {
    width: ${(props) => `calc(${props.$width} - ${props.$height})`};
    height: 100%;

    padding-left: ${(props) => props.$height};
  }

  ${Option} {
    height: ${(props) => props.$height};
  }

  &:hover {
    background-color: var(--gray-background-active-rgba);
  }
`;

export type SelectStyleProps = IButtonProps;

const SelectStyle = {
  Button,
  Value,
  Arrow,
  Option,
  OptionContainer,
};

export default SelectStyle;
