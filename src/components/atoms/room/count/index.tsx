import Layout from "@/styles/layout";
import CountStyle from "./count.style";
import { FaMinus, FaPlus } from "react-icons/fa6";
import toRem from "@/styles/utils/toRem";

interface ICountProps {
  label: string;
  value: number;
  max?: number;
  min: number;
  isError?: boolean;
  errorValue?: number;
  //
  onChange: (value: number) => void;
}

const Count: React.FC<ICountProps> = (props) => {
  const {
    label,
    value,
    max = Infinity,
    min,
    isError,
    errorValue,
    //
    onChange,
  } = props;

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

  return (
    <Layout
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={toRem(5)}
    >
      <CountStyle.Label>{label}</CountStyle.Label>

      <CountStyle.Button className={"decrease"} onClick={handleDecrease}>
        <FaMinus />
      </CountStyle.Button>

      <CountStyle.Number>
        <CountStyle.Value $isError={isError}>{value}</CountStyle.Value>
        <CountStyle.Error $isError={isError}>{errorValue}</CountStyle.Error>
      </CountStyle.Number>

      <CountStyle.Button className={"increase"} onClick={handleIncrease}>
        <FaPlus />
      </CountStyle.Button>
    </Layout>
  );
};

export default Count;
