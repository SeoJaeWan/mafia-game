import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

const Option = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  padding: 5px 0;

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

  border-radius: 5px 0 0 5px;

  border-top: 2px solid var(--gray-background-active-rgba);
  border-bottom: 2px solid var(--gray-background-active-rgba);
  border-left: 2px solid var(--gray-background-active-rgba);
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

  border-radius: 0 5px 5px 0;
  border-top: 2px solid var(--gray-background-active-rgba);
`;

interface OptionContainerProps {
  $isShow: boolean;
}

const OptionContainer = styled.div<OptionContainerProps>`
  position: absolute;
  top: calc(100% - 2px);
  left: 0;

  display: ${(props) => (props.$isShow ? "block" : "none")};

  width: 100%;

  overflow: hidden;

  border: 2px solid var(--gray-background-active-rgba);

  border-radius: 5px;
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

  border-radius: 5px;
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
