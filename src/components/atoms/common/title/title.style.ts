import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

const TitleStyle = styled.h2`
  font-size: ${toRem(24)};
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: ${toRem(20)};
  }
`;

export default TitleStyle;
