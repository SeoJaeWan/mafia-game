import StripDollar from "@/styles/utils/stripDollar";
import PlayerStyle, { PlayerStyleProps } from "./player.style";
import useGame, { Selected } from "@/hooks/useGame";

interface IPlayerProps extends StripDollar<PlayerStyleProps> {
  name: string;
  isButton?: boolean;
  selected?: string;
  //
  setSelected?: (name: string) => void;
}

const Player: React.FC<IPlayerProps> = (props) => {
  const { name, color } = props;
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
    <PlayerStyle.Container $isClick={isSelected}>
      <PlayerStyle.Character
        src={`/assets/playable/${role}.png`}
        width={350}
        height={350}
        alt={"알수 없는 플레이어"}
      />
      <PlayerStyle.Name $color={color}>{name}</PlayerStyle.Name>
    </PlayerStyle.Container>
  );
};

export default Player;
