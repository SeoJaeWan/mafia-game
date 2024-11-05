"use client";
import Button from "@/components/atoms/common/button";
import A from "@/components/atoms/common/a";
import MainTitle from "@/components/atoms/home/mainTItle";
import Layout from "@/styles/layout";
import toRem from "@/styles/utils/toRem";
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
        gap={toRem(20)}
        marginTop={toRem(80)}
      >
        <Link href={"/room"}>
          <Button>방 만들기</Button>
        </Link>

        <A href={"/rule"}>플레이 방법</A>
      </Layout>
    </Layout>
  );
};

export default HomeTemplate;