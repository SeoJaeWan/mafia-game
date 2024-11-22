import StripDollar from "@/styles/utils/stripDollar";
import CardStyle, { CardStyleProps } from "./card.style";
import { useRoom } from "@/hooks/game/hooks/room/useRoom";
import useGame from "@/hooks/game/useGame";
import { PlayableRoleNames } from "@/hooks/game/hooks/room/useGameForm";

interface ICardProps extends StripDollar<CardStyleProps> {
  name: string;
  showAnimation?: boolean;
  isButton?: boolean;
  //
}

const Card: React.FC<ICardProps> = (props) => {
  const { name, color, showAnimation, isButton } = props;
  const { playerNumber, players } = useGame();
  const { selected, playerStatuses, selectedUsers, turn, myRole, setSelected } =
    useRoom();

  const isClick =
    selected === name ||
    selectedUsers.entries().some(([_, value]) => value === name);

  const getIsSelect = () => {
    type SpecificTurns = "kill" | "heal" | "check";

    const allowedRolesByTurn: Record<SpecificTurns, PlayableRoleNames[]> = {
      kill: ["mafia"],
      heal: ["doctor"],
      check: ["police"],
    };

    const allowedRoles = allowedRolesByTurn[turn as SpecificTurns] || [];

    console.log(
      (!playerStatuses[playerNumber]?.isDie && turn === "vote") ||
        allowedRoles.includes(myRole),
      "playerStatuses[playerNumber]?.isDie",
      playerStatuses[playerNumber]?.isDie,
      "turn",
      turn,
      "allowedRoles",
      allowedRoles
    );

    if (
      (!playerStatuses[playerNumber]?.isDie && turn === "vote") ||
      allowedRoles.includes(myRole)
    ) {
      return true;
    }

    return false;
  };

  const isSelect = getIsSelect();

  const handleClickCard = () => {
    if (isButton) {
      if (!isSelect || players[playerNumber].name === name) return;

      const select = name === selected ? "" : name;
      setSelected(select);
    }
  };

  return (
    <CardStyle.Container
      as={isButton ? "button" : "div"}
      className={showAnimation ? "animation" : ""}
      $isClick={isClick}
      //
      onClick={handleClickCard}
    >
      <CardStyle.Card>
        <CardStyle.Front $color={color}>{name}</CardStyle.Front>
        <CardStyle.Back $color={color}>
          <CardStyle.FrontCard
            src={"/assets/playable/unknown.png"}
            width={299}
            height={427}
            alt={"알수 없는 플레이어"}
          />
        </CardStyle.Back>
      </CardStyle.Card>
    </CardStyle.Container>
  );
};

export default Card;
