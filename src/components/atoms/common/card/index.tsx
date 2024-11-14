import StripDollar from "@/styles/utils/stripDollar";
import CardStyle, { CardStyleProps } from "./card.style";

interface ICardProps extends StripDollar<CardStyleProps> {
  name: string;
  showAnimation?: boolean;
}

const Card: React.FC<ICardProps> = (props) => {
  const { name, color, showAnimation } = props;

  return (
    <CardStyle.Container className={showAnimation ? "animation" : ""}>
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
