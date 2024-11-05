"use client";

import StripDollar from "@/styles/utils/stripDollar";
import ButtonStyle, { IButtonStyleProps } from "./button.style";

interface IButtonProps extends StripDollar<IButtonStyleProps> {
  children: React.ReactNode;
  //
  onClick?: () => void;
}

const Button: React.FC<IButtonProps> = (props) => {
  const {
    isSmall,
    children,
    //
    onClick = () => {},
  } = props;

  return (
    <ButtonStyle $isSmall={isSmall} onClick={onClick}>
      {children}
    </ButtonStyle>
  );
};

export default Button;