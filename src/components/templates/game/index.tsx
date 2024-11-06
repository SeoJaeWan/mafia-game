import Layout from "@/styles/layout";
import { headerHeight } from "../header";
import Chat from "@/components/organisms/game/chat";
import PlayBoard from "@/components/organisms/game/playBoard";

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
      <Layout width={"70%"} height={"100%"}>
        <PlayBoard />
      </Layout>
      <Layout width={"30%"} height={"100%"}>
        <Chat />
      </Layout>
    </Layout>
  );
};

export default GameTemplate;
