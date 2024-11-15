import StripDollar from "@/styles/utils/stripDollar";
import CardStyle, { CardStyleProps } from "./card.style";
import useGame from "@/hooks/useGame";

interface ICardProps extends StripDollar<CardStyleProps> {
  name: string;
  showAnimation?: boolean;
  isButton?: boolean;
  //
}

const Card: React.FC<ICardProps> = (props) => {
  const { name, color, showAnimation, isButton } = props;
  const { selectedUser, selectUser } = useGame();

  const isClick = selectedUser.entries().some(([_, value]) => value === name);

  const handleClickCard = () => {
    if (isButton) {
      selectUser(name);
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
