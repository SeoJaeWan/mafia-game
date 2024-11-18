"use client";
import Link from "next/link";
import HeaderTitleStyle from "./headerTitle.style";

const HeaderTitle = () => {
  return (
    <Link href={"/"}>
      <HeaderTitleStyle>Mafia Game</HeaderTitleStyle>
    </Link>
  );
};

export default HeaderTitle;
