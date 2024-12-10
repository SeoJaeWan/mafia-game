import EnterTemplate from "@/components/templates/enter";
import createMeta from "@/utils/createMeta";

export const metadata = createMeta({
  title: " - 방 생성",
  description: "마피아 게임을 즐겨보세요.",
});

const Create = () => {
  return <EnterTemplate type={"create"} />;
};

export default Create;
