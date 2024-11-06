import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

const Container = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: ${toRem(5)};

  width: 100%;

  padding: 0 ${toRem(10)};
`;

const InputFormStyle = {
  Container,
};

export default InputFormStyle;
