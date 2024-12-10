import RoomTemplate from "@/components/templates/room";
import createMeta from "@/utils/createMeta";

export const metadata = createMeta({
  title: " - 방",
  description: "마피아 게임을 즐겨보세요.",
});

const Room = () => {
  return <RoomTemplate />;
};

export default Room;
