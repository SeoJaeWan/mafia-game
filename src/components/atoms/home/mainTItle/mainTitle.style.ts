import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

const Title = styled.h1`
  font-size: ${toRem(70)};
  line-height: ${toRem(70)};
  font-weight: 600;

  text-align: center;
`;

const SubTitle = styled.p`
  font-size: ${toRem(24)};
  line-height: ${toRem(24)};
  font-weight: 600;

  text-align: center;
`;

const MainTitleStyle = {
  Title,
  SubTitle,
};

export default MainTitleStyle;
