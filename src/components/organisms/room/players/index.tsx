import useGame from "@/hooks/useGame";
import PlayersStyle from "./players.style";
import Title from "@/components/atoms/common/title";

const Players = () => {
  const { playerList, gameLeave } = useGame();

  return (
    <PlayersStyle.Container>
      <Title>플레이어</Title>

      <PlayersStyle.Leave onClick={gameLeave} />

      <PlayersStyle.List>
        {playerList.map(({ name, color }) => (
          <PlayersStyle.Item $color={color} key={name}>
            {name}
          </PlayersStyle.Item>
        ))}
      </PlayersStyle.List>
    </PlayersStyle.Container>
  );
};

export default Players;
