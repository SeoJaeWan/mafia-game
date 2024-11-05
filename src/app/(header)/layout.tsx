import Header from "@/components/templates/header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
