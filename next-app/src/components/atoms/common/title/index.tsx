import React from "react";
import TitleStyle from "./title.style";

interface ITitleProps {
  children: React.ReactNode;
}

const Title: React.FC<ITitleProps> = (props) => {
  const { children } = props;

  return <TitleStyle>{children}</TitleStyle>;
};

export default Title;
