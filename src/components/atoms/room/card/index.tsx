import StripDollar from "@/styles/utils/stripDollar";
import CardStyle, { CardStyleProps } from "./card.style";
import { useRoom } from "@/hooks/game/hooks/room/useRoom";

interface ICardProps extends StripDollar<CardStyleProps> {
  name: string;
  showAnimation?: boolean;
  isButton?: boolean;
  //
}

const Card: React.FC<ICardProps> = (props) => {
  const { name, color, showAnimation, isButton } = props;
  const { selected, selectedUsers, isSelect, setSelected } = useRoom();

  const isClick =
    selected === name ||
    selectedUsers.entries().some(([_, value]) => value === name);

  const handleClickCard = () => {
    if (isButton) {
      if (!isSelect) return;

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
