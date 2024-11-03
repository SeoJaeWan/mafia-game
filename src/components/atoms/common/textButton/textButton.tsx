"use client";
import TextButtonStyle from "./textButton.style";

interface ITextButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const TextButton: React.FC<ITextButtonProps> = (props) => {
  const { children, onClick } = props;

  return <TextButtonStyle onClick={onClick}>{children}</TextButtonStyle>;
};

export default TextButton;
