"use client";

import Button from "@/components/atoms/common/button";

import MainTitle from "@/components/atoms/home/mainTItle";
import Layout from "@/styles/layout";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

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

        {/* <Link href={"/rule"} passHref legacyBehavior>
          <A>플레이 방법</A>
        </Link> */}
      </Layout>
      <Layout
        position={"fixed"}
        bottom={"20px"}
        left={"50%"}
        transform="translateX(-50%)"
      >
        <Link
          href={"https://github.com/SeoJaeWan/mafia-game"}
          passHref
          legacyBehavior
        >
          <a target={"_blank"}>
            <FaGithub size={40} />
          </a>
        </Link>
      </Layout>
    </Layout>
  );
};

export default HomeTemplate;
