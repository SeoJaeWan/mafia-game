import useGame from "@/hooks/useGame";
import SubmitStyle from "./submit.style";

const Submit = () => {
  const { selected, selectUser } = useGame();

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
