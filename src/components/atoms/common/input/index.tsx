"use client";
import StripDollar from "@/styles/utils/stripDollar";
import InputStyle, { IInputStyleProps } from "./input.style";

interface IInputProps extends StripDollar<IInputStyleProps> {
  value: string;
  placeholder?: string;
  //
  onChange: (value: string) => void;
}

const Input: React.FC<IInputProps> = (props) => {
  const {
    flex,
    //
    width,
    height,
    //
    value,
    placeholder,
    onChange,
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <InputStyle
      $flex={flex}
      //
      $width={width}
      $height={height}
      //
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default Input;
