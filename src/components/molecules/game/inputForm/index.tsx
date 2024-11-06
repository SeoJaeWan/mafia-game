import Button from "@/components/atoms/common/button";
import Input from "@/components/atoms/common/input";
import toRem from "@/styles/utils/toRem";
import InputFormStyle from "./inputForm.style";

const InputForm = () => {
  return (
    <InputFormStyle.Container>
      <Input flex={"1"} height={toRem(30)} value={""} onChange={() => {}} />
      <Button isSmall>전송</Button>
    </InputFormStyle.Container>
  );
};

export default InputForm;
