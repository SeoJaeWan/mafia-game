import Header from "@/components/templates/header";
import Main from "@/components/templates/main";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;
