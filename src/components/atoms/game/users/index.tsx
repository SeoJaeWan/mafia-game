import Layout from "@/styles/layout";
import UsersStyle from "./users.style";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { useState } from "react";
import toRem from "@/styles/utils/toRem";

const Users = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <UsersStyle.Container>
      <UsersStyle.Button onClick={handleToggle}>
        <UsersStyle.Label>Users</UsersStyle.Label>
        <UsersStyle.Arrow>
          {open ? <FaCaretUp size={16} /> : <FaCaretDown size={16} />}
        </UsersStyle.Arrow>
      </UsersStyle.Button>

      <UsersStyle.List $height={open ? `calc(${toRem(35)} * 10)` : `0px`}>
        <UsersStyle.Item>Player 1</UsersStyle.Item>
        <UsersStyle.Item>Player 2</UsersStyle.Item>
        <UsersStyle.Item>Player 3</UsersStyle.Item>
        <UsersStyle.Item>Player 4</UsersStyle.Item>
        <UsersStyle.Item>Player 5</UsersStyle.Item>
        <UsersStyle.Item>Player 6</UsersStyle.Item>
        <UsersStyle.Item>Player 7</UsersStyle.Item>
      </UsersStyle.List>
    </UsersStyle.Container>
  );
};

export default Users;
