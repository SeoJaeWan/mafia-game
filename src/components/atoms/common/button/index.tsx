"use client";

import StripDollar from "@/styles/utils/stripDollar";
import ButtonStyle, { IButtonStyleProps } from "./button.style";

interface IButtonProps extends StripDollar<IButtonStyleProps> {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  //
  onClick?: () => void;
}

const Button: React.FC<IButtonProps> = (props) => {
  const {
    width,
    height,
    //
    isSmall,
    isDisable,
    children,
    //
    type = "button",
    onClick = () => {},
  } = props;

  return (
    <ButtonStyle
      $width={width}
      $height={height}
      //
      $isSmall={isSmall}
      $isDisable={isDisable}
      //
      type={type}
      onClick={onClick}
    >
      {children}
    </ButtonStyle>
  );
};

export default Button;
