"use client";
import Layout from "@/styles/layout";
import MainTitleStyle from "./mainTitle.style";

const MainTitle: React.FC = () => {
  return (
    <Layout>
      <MainTitleStyle.SubTitle>Mafia Game</MainTitleStyle.SubTitle>
      <MainTitleStyle.Title>마피아 게임</MainTitleStyle.Title>
    </Layout>
  );
};

export default MainTitle;
