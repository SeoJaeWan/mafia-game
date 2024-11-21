import RoomTemplate from "@/components/templates/room";
import RoomProvider from "@/hooks/game/hooks/room/useRoom";

const Room = () => {
  return (
    <RoomProvider>
      <RoomTemplate />
    </RoomProvider>
  );
};

export default Room;
