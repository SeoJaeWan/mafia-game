"use client";
import Link from "next/link";
import HeaderTitleStyle from "./headerTitle.style";

const HeaderTitle = () => {
  return (
    <HeaderTitleStyle>
      <Link href={"/"}>Mafia Game</Link>
    </HeaderTitleStyle>
  );
};

export default HeaderTitle;
