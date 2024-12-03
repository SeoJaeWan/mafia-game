"use client";

import Layout from "@/styles/layout";
import LabelStyle from "./label.style";

interface ILabelProps {
  label: string;
  children: React.ReactNode;
}

const Label: React.FC<ILabelProps> = (props) => {
  const { label, children } = props;

  return (
    <Layout
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <LabelStyle>{label}</LabelStyle>
      {children}
    </Layout>
  );
};

export default Label;
