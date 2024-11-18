import Github from "@/components/atoms/common/github";
import Title from "@/components/atoms/header/headerTitle";
import Layout from "@/styles/layout";
import toRem from "@/styles/utils/toRem";

export const headerHeight = toRem(50);

const Header = () => {
  return (
    <Layout
      position={"fixed"}
      top={"0"}
      left={"0"}
      //
      display={"flex"}
      justifyContent={"space-between"}
      //
      width={"100vw"}
      height={headerHeight}
      as={"header"}
    >
      <Layout width={toRem(100)} />

      <Title />

      <Layout
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        //
        width={toRem(100)}
        //
        padding={`0 ${toRem(20)}`}
      >
        <Github size={24} />
      </Layout>
    </Layout>
  );
};

export default Header;
