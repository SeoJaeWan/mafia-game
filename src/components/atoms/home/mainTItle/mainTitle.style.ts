import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

const Title = styled.h1`
  font-size: ${toRem(54)};
  line-height: ${toRem(54)};
  font-weight: 600;

  text-align: center;
`;

const SubTitle = styled.p`
  font-size: ${toRem(20)};
  line-height: ${toRem(20)};
  font-weight: 600;

  text-align: center;
`;

const MainTitleStyle = {
  Title,
  SubTitle,
};

export default MainTitleStyle;
