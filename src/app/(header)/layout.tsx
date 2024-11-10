import Header from "@/components/templates/header";
import Main from "@/components/templates/main";
import GameProvider from "@/hooks/useGame/gameProvider";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <GameProvider>
      <Header />
      <Main>{children}</Main>
    </GameProvider>
  );
};

export default Layout;
