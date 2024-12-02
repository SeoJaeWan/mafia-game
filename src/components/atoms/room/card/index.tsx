import StripDollar from "@/styles/utils/stripDollar";
import CardStyle, { CardStyleProps } from "./card.style";
import useGame, { Selected } from "@/hooks/useGame";

interface ICardProps extends StripDollar<CardStyleProps> {
  name: string;
  showAnimation?: boolean;
  isButton?: boolean;
  selected?: string;
  //
  setSelected?: (name: string) => void;
}

const Card: React.FC<ICardProps> = (props) => {
  const { name, color, showAnimation } = props;
  const { player, selectedList } = useGame();
  const role = player!.name === name ? player!.role : "unknown";

  const currentSelectedList = selectedList.reduce((acc, cur) => {
    if (cur.name === name) {
      return [...acc, cur];
    }

    return acc;
  }, [] as Selected[]);
  const isSelected = currentSelectedList.length > 0;

  return (
    <CardStyle.Container
      className={showAnimation ? "animation" : ""}
      $isClick={isSelected}
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
  );
};

export default Card;
