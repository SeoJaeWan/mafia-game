import useGame from "@/hooks/useGame";
import SubmitStyle from "./submit.style";

interface SubmitProps {
  selected: string;
}

const Submit = (props: SubmitProps) => {
  const { selected } = props;
  const {
    player,
    selectedList,
    //
    selectPlayer,
  } = useGame();

  const mySelected = selectedList.find(
    (item) => item.selector === player!.name
  );

  const isSelected = !!mySelected;
  const isOtherChoice = isSelected && mySelected?.name !== selected;

  const selectButton = isOtherChoice ? "변경" : isSelected ? "취소" : "완료";

  const handleSubmitUser = () => {
    selectPlayer(selected);
  };

  if (!selected) {
    return null;
  }

  return (
    <SubmitStyle.SubmitContainer>
      <SubmitStyle.SubmitButton onClick={handleSubmitUser}>
        선택 {selectButton}
      </SubmitStyle.SubmitButton>
    </SubmitStyle.SubmitContainer>
  );
};

export default Submit;
