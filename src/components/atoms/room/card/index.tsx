import StripDollar from "@/styles/utils/stripDollar";
import CardStyle, { CardStyleProps } from "./card.style";
import { useRoom } from "@/hooks/game/hooks/room/useRoom";
import useGame from "@/hooks/game/useGame";
import { PlayableRoleNames } from "@/hooks/game/hooks/room/useGameForm";

type CardRole = PlayableRoleNames | "unknown";
interface ICardProps extends StripDollar<CardStyleProps> {
  name: string;
  showAnimation?: boolean;
  isButton?: boolean;
}

const Card: React.FC<ICardProps> = (props) => {
  const { name, color, showAnimation, isButton } = props;
  const { player } = useGame();

  const role = player!.name === name ? player!.role : "unknown";

  return (
    <CardStyle.Container
      as={isButton ? "button" : "div"}
      className={showAnimation ? "animation" : ""}
      $isClick={false}
      //
      // onClick={handleClickCard}
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
