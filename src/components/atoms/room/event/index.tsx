import Image from "next/image";
import EventStyle from "./event.style";
import { useRoom } from "@/hooks/game/hooks/room/useRoom";
import { Animation } from "@/hooks/game/hooks/room/useEvent";

const Event: React.FC = () => {
  const { events, clearEvent } = useRoom();

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
          // ref={animationRef}
          onAnimationEnd={clearEvent}
        />
      </EventStyle.AnimationBox>
    </EventStyle.Container>
  );
};

export default Event;
