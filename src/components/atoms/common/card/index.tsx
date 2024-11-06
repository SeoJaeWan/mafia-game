import StripDollar from "@/styles/utils/stripDollar";
import CardStyle, { CardStyleProps } from "./card.style";

const Card: React.FC<StripDollar<CardStyleProps>> = (props) => {
  const { width } = props;

  return (
    <CardStyle.Container $width={width}>
      <CardStyle.Card>
        <CardStyle.Front>
          <CardStyle.FrontCard
            src={"/assets/playable/unknown.png"}
            width={299}
            height={427}
            alt={"알수 없는 플레이어"}
          />
        </CardStyle.Front>
        <CardStyle.Back>zzzzzzz</CardStyle.Back>
      </CardStyle.Card>
    </CardStyle.Container>
  );
};

export default Card;
