import toRem from "@/styles/utils/toRem";
import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
`;

const Logo = styled(Image)`
  width: 30%;
  height: auto;

  aspect-ratio: 767/654;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Content = styled.p`
  margin-top: 20px;

  font-size: ${toRem(28)};
  font-weight: 700;
  line-height: 1.5;
  text-align: center;

  @media (max-width: 768px) {
    font-size: ${toRem(18)};
  }
`;

const ErrorStyle = {
  Container,
  Logo,
  Content,
};

export default ErrorStyle;
