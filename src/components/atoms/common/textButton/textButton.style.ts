import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

const TextButtonStyle = styled.button`
  background-color: transparent;
  border: none;

  font-size: ${toRem(18)};
  font-weight: 600;
`;

export default TextButtonStyle;
