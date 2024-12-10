"use client";
import Layout from "@/styles/layout";
import ErrorStyle from "./error.style";
import Button from "@/components/atoms/common/button";
import A from "@/components/atoms/common/a/a.style";
import Link from "next/link";

const ErrorTemplate = () => {
  return (
    <ErrorStyle.Container>
      <ErrorStyle.Logo
        src={"/assets/playable/error.png"}
        alt={""}
        width={767}
        height={654}
      />

      <ErrorStyle.Content>
        페이지를 찾을 수 없습니다. <br />
        오류가 반복되면 관리자에게 문의해주세요.
      </ErrorStyle.Content>

      <Layout
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"20px"}
        marginTop={"20px"}
      >
        <Link href={"/"}>
          <Button>홈으로</Button>
        </Link>
        <Link
          href={"https://github.com/SeoJaeWan/mafia-game/issues"}
          passHref
          legacyBehavior
        >
          <A target={"_blank"}>문의하기</A>
        </Link>
      </Layout>
    </ErrorStyle.Container>
  );
};

export default ErrorTemplate;
