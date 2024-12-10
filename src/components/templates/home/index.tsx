"use client";
import A from "@/components/atoms/common/a/a.style";
import Button from "@/components/atoms/common/button";

import MainTitle from "@/components/atoms/home/mainTItle";
import Layout from "@/styles/layout";
import Link from "next/link";

const HomeTemplate: React.FC = () => {
  return (
    <Layout
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
    >
      <MainTitle />

      <Layout
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"20px"}
        marginTop={"80px"}
      >
        <Link href={"/create"}>
          <Button>방 만들기</Button>
        </Link>

        <Link href={"/rule"} passHref legacyBehavior>
          <A>플레이 방법</A>
        </Link>
      </Layout>
    </Layout>
  );
};

export default HomeTemplate;
