import UsersStyle from "./users.style";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { useState } from "react";
import useGame from "@/hooks/game/useGame";

const Users = () => {
  const { players } = useGame();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <UsersStyle.Container>
      <UsersStyle.Button onClick={handleToggle}>
        <UsersStyle.Label>접속자 : {players.length}명</UsersStyle.Label>
        <UsersStyle.Arrow>
          {open ? <FaCaretUp size={16} /> : <FaCaretDown size={16} />}
        </UsersStyle.Arrow>
      </UsersStyle.Button>

      <UsersStyle.List $height={open ? `calc(35px * 10)` : `0px`}>
        {players.map(({ name }, index) => (
          <UsersStyle.Item key={index}>{name}</UsersStyle.Item>
        ))}
      </UsersStyle.List>
    </UsersStyle.Container>
  );
};

export default Users;
