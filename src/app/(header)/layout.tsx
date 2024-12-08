import { GameProvider } from "@/hooks/useGame";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return <GameProvider>{children}</GameProvider>;
};

export default Layout;
