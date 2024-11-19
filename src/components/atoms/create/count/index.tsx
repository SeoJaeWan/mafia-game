import CountStyle, { CountStyleProps } from "./count.style";
import { FaCheck, FaMinus, FaPlus } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import StripDollar from "@/styles/utils/stripDollar";

interface ICountProps extends StripDollar<CountStyleProps> {
  value: number;
  max?: number;
  min: number;
  errorValue?: number;
  //
  onChange: (value: number) => void;
}

const Count: React.FC<ICountProps> = (props) => {
  const {
    value,
    max = Infinity,
    min,
    isError,
    errorValue,
    //
    onChange,
  } = props;

  const [isInput, setIsInput] = useState(false);
  const [input, setInput] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIncrease = () => {
    const isMax = value === max;
    if (isMax) return;

    onChange(value + 1);
  };

  const handleDecrease = () => {
    const isMin = value === min;
    if (isMin) return;

    onChange(value - 1);
  };

  const handleInputUpdate = () => {
    if (!isInput) {
      setIsInput(true);
      setInput(value);
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(Number(e.target.value));
  };

  const handleConfirm = () => {
    onChange(input);
    setIsInput(false);
  };

  const handleEnterInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleConfirm();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLInputElement;

          target.select();
        } else {
          setIsInput(false);
        }
      });
    });

    if (inputRef.current) {
      observer.observe(inputRef.current);
    }

    return () => {
      if (inputRef.current) {
        observer.unobserve(inputRef.current);
      }
    };
  }, []);

  return (
    <CountStyle.Container $isInput={isInput}>
      <CountStyle.Button
        type={"button"}
        className={"decrease count"}
        onClick={handleDecrease}
      >
        <FaMinus />
      </CountStyle.Button>

      <CountStyle.Number onClick={handleInputUpdate}>
        <CountStyle.Input
          ref={inputRef}
          type={"number"}
          value={input}
          onChange={handleChangeInput}
          onKeyPress={handleEnterInput}
        />

        <CountStyle.Value className={"count"} $isError={isError}>
          {value}
        </CountStyle.Value>
        <CountStyle.Error className={"count"} $isError={isError}>
          {errorValue}
        </CountStyle.Error>
      </CountStyle.Number>

      <CountStyle.Button
        type={"button"}
        className={"increase count"}
        onClick={handleIncrease}
      >
        <FaPlus />
      </CountStyle.Button>

      <CountStyle.Button
        type={"button"}
        className={"confirm"}
        onClick={handleConfirm}
      >
        <FaCheck />
      </CountStyle.Button>
    </CountStyle.Container>
  );
};

export default Count;
