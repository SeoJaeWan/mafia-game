import StripDollar from "@/styles/utils/stripDollar";
import CardStyle, { CardStyleProps } from "./card.style";
import useGame from "@/hooks/game/useGame";
import { PlayableRoleNames } from "@/hooks/game/hooks/room/useGameForm";
import { useState } from "react";

interface ICardProps extends StripDollar<CardStyleProps> {
  name: string;
  showAnimation?: boolean;
  isButton?: boolean;
}

const selectAble = [
  {
    turn: "mafiaVote",
    role: "mafia",
  },
  {
    turn: "check",
    role: "police",
  },
  {
    turn: "heal",
    role: "doctor",
  },
];

const Card: React.FC<ICardProps> = (props) => {
  const { name, color, showAnimation, isButton } = props;
  const {
    player,
    turn,
    selectedList,
    //
    selectPlayer,
  } = useGame();
  const [selected, setSelected] = useState("");
  const role = player!.name === name ? player!.role : "unknown";

  const handleClickCard = () => {
    if (isButton) {
      if (name !== player!.name) {
        const isSelectAble = selectAble.find(
          (item) => item.turn === turn && item.role === player!.role
        );

        if (isSelectAble) {
          setSelected(name);
        } else if (turn === "citizenVote") {
          // 시민 투표
        }
      }
    }
  };

  const handleLockCard = () => {
    selectPlayer(selected);
  };

  return (
    <>
      <CardStyle.Container
        as={isButton ? "button" : "div"}
        className={showAnimation ? "animation" : ""}
        $isClick={false}
        //
        onClick={handleClickCard}
      >
        <CardStyle.Card>
          <CardStyle.Front $color={color}>{name}</CardStyle.Front>
          <CardStyle.Back $color={color}>
            <CardStyle.FrontCard
              src={`/assets/playable/${role}.png`}
              width={350}
              height={350}
              alt={"알수 없는 플레이어"}
            />
          </CardStyle.Back>
        </CardStyle.Card>
      </CardStyle.Container>

      <CardStyle.SubmitContainer>
        <CardStyle.SubmitButton onClick={handleLockCard}>
          선택 완료
        </CardStyle.SubmitButton>
        <CardStyle.SubmitButton>확정</CardStyle.SubmitButton>
      </CardStyle.SubmitContainer>
    </>
  );
};

export default Card;
