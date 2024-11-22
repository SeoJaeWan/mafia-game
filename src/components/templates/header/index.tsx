import Github from "@/components/atoms/common/github";
import Title from "@/components/atoms/header/headerTitle";
import Layout from "@/styles/layout";

export const headerHeight = "50px";

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
      <Layout width={"100px"} />

      <Title />

      <Layout
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        //
        width={"50px"}
        //
        padding={`0 20px`}
      >
        <Github size={24} />
      </Layout>
    </Layout>
  );
};

export default Header;
