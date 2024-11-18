import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

const LabelStyle = styled.p`
  width: ${toRem(60)};

  font-size: ${toRem(12)};
  font-weight: 400;

  margin-right: ${toRem(10)};
`;

export default LabelStyle;
