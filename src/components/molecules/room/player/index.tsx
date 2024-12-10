import StripDollar from "@/styles/utils/stripDollar";
import PlayerStyle, { PlayerStyleProps } from "./player.style";
import useGame from "@/hooks/useGame";
import { useEffect, useMemo, useState } from "react";
import Character from "@/components/atoms/common/character";

interface Selector {
  name: string;
  color: string;
}

interface IPlayerProps extends StripDollar<PlayerStyleProps> {
  name: string;
  isButton?: boolean;
  selected?: string;
  role?: string;
  alive: boolean;
  //
  setSelected: (name: string) => void;
}

const selectAble = [
  {
    turn: "mafiaVote",
    role: "mafia",
  },
  {
    turn: "check",
    role: "police",
  },
  {
    turn: "heal",
    role: "doctor",
  },
];

const Player: React.FC<IPlayerProps> = (props) => {
  const { name, alive, role = "citizen", color, setSelected } = props;
  const { isChatAble, selectedList, messageList, player, playerList, turn } =
    useGame();
  const [mouseAni, setMouseAni] = useState(false);

  const characterRole = !alive ? "die" : role;

  const isAlive = !alive || !player.alive;
  const isCitizenVote = turn === "citizenVote";
  const isMe = player.name === name;
  const isSelectAble = !!selectAble.find(
    (item) => item.turn === turn && item.role === player.role
  );

  const selectDisable = isAlive || !(isCitizenVote || isSelectAble) || isMe;

  const currentSelectedList = selectedList.reduce((acc, cur) => {
    if (cur.name === name) {
      return [
        ...acc,
        {
          name: cur.selector,
          color: playerList.find((player) => player.name === cur.selector)!
            .color,
        },
      ];
    }

    return acc;
  }, [] as Selector[]);

  const playerMessage = useMemo(
    () => messageList.filter((item) => item.name === name),
    [messageList, name]
  );

  const handleClickPlayer = () => {
    setSelected(name);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (playerMessage.length > 0) {
      setMouseAni(true);

      timer = setTimeout(() => {
        setMouseAni(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [playerMessage.length]);

  return (
    <PlayerStyle.Container>
      <PlayerStyle.MessageList $isChatAble={isChatAble}>
        {playerMessage.slice(-4).map(({ message, time }) => (
          <PlayerStyle.Message key={time} $color={color}>
            {message}
          </PlayerStyle.Message>
        ))}
      </PlayerStyle.MessageList>

      <PlayerStyle.SelectorList>
        {currentSelectedList.map(({ name, color }) => (
          <PlayerStyle.SelectorName key={name} $color={color}>
            {name}
          </PlayerStyle.SelectorName>
        ))}
      </PlayerStyle.SelectorList>

      <button onClick={handleClickPlayer} disabled={selectDisable}>
        <Character
          characterRole={characterRole}
          mouseAni={mouseAni}
          color={color}
        >
          {name}
        </Character>
      </button>
    </PlayerStyle.Container>
  );
};

export default Player;
