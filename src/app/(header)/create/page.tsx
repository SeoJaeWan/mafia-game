import EnterTemplate from "@/components/templates/enter";
import createRoomId from "@/utils/createRoomId";

const Create = () => {
  const roomId = createRoomId();

  return <EnterTemplate roomId={roomId} type={"create"} />;
};

export default Create;
