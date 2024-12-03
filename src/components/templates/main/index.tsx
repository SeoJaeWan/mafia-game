import Layout from "@/styles/layout";

interface IMainProps {
  children: React.ReactNode;
}

const Main: React.FC<IMainProps> = (props) => {
  const { children } = props;

  return (
    <Layout
      as={"main"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
    >
      {children}
    </Layout>
  );
};

export default Main;
