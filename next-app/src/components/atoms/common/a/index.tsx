"use client";
import AStyle from "./a.style";

interface IAProps {
  children: React.ReactNode;
  href: string;
}

const A: React.FC<IAProps> = (props) => {
  const { children, href } = props;

  return <AStyle href={href}>{children}</AStyle>;
};

export default A;
