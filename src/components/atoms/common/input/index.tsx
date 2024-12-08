"use client";
import StripDollar from "@/styles/utils/stripDollar";
import InputStyle, { IInputStyleProps } from "./input.style";
import { forwardRef } from "react";

interface IInputProps extends StripDollar<IInputStyleProps> {
  value: string;
  placeholder?: string;
  maxLength?: number;
  isDisable?: boolean;
  //
  onChange: (value: string) => void;
}

const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const {
    flex,
    //
    width,
    height,
    //
    maxLength,
    value,
    placeholder,
    isDisable,
    onChange,
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisable || (maxLength && e.target.value.length > maxLength)) return;

    onChange(e.target.value);
  };

  return (
    <InputStyle
      ref={ref}
      $flex={flex}
      //
      $width={width}
      $height={height}
      //
      $isDisable={isDisable}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
});

Input.displayName = "Input";

export default Input;
