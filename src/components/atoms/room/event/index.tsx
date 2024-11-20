import Image from "next/image";
import EventStyle from "./event.style";

interface IEvent {
  event: string;
}

const Event: React.FC<IEvent> = (props) => {
  const { event } = props;

  const eventSrc = `/assets/room/event/${event}.png`;

  return (
    <EventStyle.Container $isShow={!!event}>
      <EventStyle.AnimationBox>
        <Image src={eventSrc} alt={""} width={200 * 26} height={200} />
      </EventStyle.AnimationBox>
    </EventStyle.Container>
  );
};

export default Event;
