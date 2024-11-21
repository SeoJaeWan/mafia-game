import Image from "next/image";
import EventStyle from "./event.style";
import { useRoom } from "@/hooks/game/hooks/room/useRoom";
import { Animation } from "@/hooks/game/hooks/room/useEvent";
import useAnimationEnd from "@/hooks/game/hooks/room/useAnimationEnd";

const Event: React.FC = () => {
  const { events } = useRoom();
  const animationRef = useAnimationEnd<HTMLImageElement>();
  const isShow = Animation.includes(events[0]);

  const eventSrc = `/assets/room/event/${events[0]}.png`;

  if (!isShow) return null;

  return (
    <EventStyle.Container>
      <EventStyle.AnimationBox>
        <Image
          src={eventSrc}
          alt={""}
          width={200 * 26}
          height={200}
          ref={animationRef}
        />
      </EventStyle.AnimationBox>
    </EventStyle.Container>
  );
};

export default Event;
