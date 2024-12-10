import EnterTemplate from "@/components/templates/enter";
import createMeta from "@/utils/createMeta";

export const metadata = createMeta({
  title: " - 방 참가",
  description: "마피아 게임 초대가 왔어요.",
});

const Join = () => {
  return <EnterTemplate type={"join"} />;
};

export default Join;
