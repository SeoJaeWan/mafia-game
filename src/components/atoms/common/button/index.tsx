"use client";

import ButtonStyle from "./button.style";

interface IButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<IButtonProps> = (props) => {
  const { children } = props;

  return <ButtonStyle>{children}</ButtonStyle>;
};

export default Button;
