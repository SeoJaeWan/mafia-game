import useGame from "@/hooks/useGame";
import SubmitStyle from "./submit.style";

const Submit = () => {
  const { turn, me, selectedUser, submitUser } = useGame();

  const getShowOrActive = () => {
    let isShow = false;
    let isActive = false;

    if (turn === "kill" && me.role === "mafia") {
      isShow = true;

      const set = new Set(selectedUser.values());
      isActive = set.size === 1;
    }

    if (turn === "heal" && me.role === "doctor") {
      isShow = true;
      isActive = selectedUser.size === 1;
    }

    if (turn === "check" && me.role === "police") {
      isShow = true;
      isActive = selectedUser.size === 1;
    }

    if (turn === "마피아 투표") {
      isShow = true;

      selectedUser.entries().forEach(([key, value]) => {
        if (key === me.name) {
          isActive = true;
        }
      });
    }

    return [isShow, isActive];
  };

  const [isShow, isActive] = getShowOrActive();

  const handleSubmitUser = () => {
    submitUser(selectedUser);
  };

  return (
    <SubmitStyle
      $isShow={isShow}
      $isActive={isActive}
      onClick={handleSubmitUser}
    >
      선택 완료
    </SubmitStyle>
  );
};

export default Submit;
