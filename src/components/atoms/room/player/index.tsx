import StripDollar from "@/styles/utils/stripDollar";
import PlayerStyle, { PlayerStyleProps } from "./player.style";
import useGame from "@/hooks/useGame";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

interface Selector {
  name: string;
  color: string;
}

interface IPlayerProps extends StripDollar<PlayerStyleProps> {
  name: string;
  isButton?: boolean;
  selected?: string;
  role?: string;
  //
  setSelected?: (name: string) => void;
}

const Player: React.FC<IPlayerProps> = (props) => {
  const { name, role = "citizen", color } = props;
  const { selectedList, messageList, playerList } = useGame();
  const [mouseAni, setMouseAni] = useState(false);

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
      <PlayerStyle.MessageList>
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

      <PlayerStyle.Character
        src={`/assets/playable/${role}.png`}
        width={200}
        height={200}
        alt={""}
      />
      <PlayerStyle.Mouse $mouseAni={mouseAni}>
        <Image
          src={"/assets/playable/mouse.png"}
          alt={""}
          width={205}
          height={97}
        />
      </PlayerStyle.Mouse>
      <PlayerStyle.Name $color={color}>{name}</PlayerStyle.Name>
    </PlayerStyle.Container>
  );
};

export default Player;
