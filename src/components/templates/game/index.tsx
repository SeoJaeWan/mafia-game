import Layout from "@/styles/layout";
import { headerHeight } from "../header";
import Chat from "@/components/molecules/game/chat";

const GameTemplate = () => {
  return (
    <Layout
      display={"flex"}
      flexDirection={"row"}
      //
      width={"100%"}
      height={"100%"}
      //
      paddingTop={headerHeight}
    >
      <Layout width={"70%"} height={"100%"}></Layout>
      <Layout width={"30%"} height={"100%"}>
        <Chat />
      </Layout>
    </Layout>
  );
};

export default GameTemplate;
