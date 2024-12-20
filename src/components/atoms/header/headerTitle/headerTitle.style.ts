import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

const HeaderTitleStyle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    font-family: var(--font-anton);

    font-size: ${toRem(28)};
  }
`;

export default HeaderTitleStyle;
