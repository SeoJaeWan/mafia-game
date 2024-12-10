import useGame from "@/hooks/useGame";
import PlayerStyle from "./players.style";
import Title from "@/components/atoms/common/title";

const Players = () => {
  const { playerList } = useGame();

  return (
    <PlayerStyle.Container>
      <Title>플레이어</Title>

      <PlayerStyle.List>
        {playerList.map(({ name, color }) => (
          <PlayerStyle.Item $color={color} key={name}>
            {name}
          </PlayerStyle.Item>
        ))}
      </PlayerStyle.List>
    </PlayerStyle.Container>
  );
};

export default Players;
