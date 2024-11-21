import SubmitStyle from "./submit.style";
import { useRoom } from "@/hooks/game/hooks/room/useRoom";

const Submit = () => {
  const { selected, selectUser } = useRoom();

  const isShow = !!selected;

  const handleSubmitUser = () => {
    selectUser(selected);
  };

  return (
    <SubmitStyle $isShow={isShow} onClick={handleSubmitUser}>
      선택 완료
    </SubmitStyle>
  );
};

export default Submit;
