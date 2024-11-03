import StripDollar from "@/styles/utils/stripDollar";
import GameSettingStyle, { IGameSettingStyleProps } from "./gameSetting.style";
import Layout from "@/styles/layout";
import Count from "@/components/atoms/room/count";
import toRem from "@/styles/utils/toRem";
import Button from "@/components/atoms/common/button";
import { useState } from "react";

interface IGameSettingProps extends StripDollar<IGameSettingStyleProps> {
  handleGameSetting: () => void;
}

const GameSetting: React.FC<IGameSettingProps> = (props) => {
  const { isShow, handleGameSetting } = props;
  const [boxClass, setBoxClass] = useState("");

  const handleCloseSetting = () => {
    setBoxClass("close");

    setTimeout(() => {
      handleGameSetting();
      setBoxClass("");
    }, 299);
  };

  return (
    <GameSettingStyle.Container $isShow={isShow}>
      <GameSettingStyle.Background onClick={handleCloseSetting} />
      <GameSettingStyle.Box className={boxClass}>
        <GameSettingStyle.Title>게임 설정</GameSettingStyle.Title>

        <Layout
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={toRem(20)}
          marginTop={toRem(40)}
          marginBottom={toRem(30)}
        >
          <Layout>
            <Count
              label={"전체 인원"}
              value={0}
              max={10}
              min={0}
              onChange={() => {}}
            />
          </Layout>

          <Layout>
            <Count
              label={"마피아"}
              value={0}
              max={10}
              min={0}
              onChange={() => {}}
            />
          </Layout>

          <Layout>
            <Count
              label={"시민"}
              value={0}
              max={10}
              min={0}
              onChange={() => {}}
            />
          </Layout>

          <Layout>
            <Count
              label={"경찰"}
              value={0}
              max={10}
              min={0}
              onChange={() => {}}
            />
          </Layout>

          <Layout>
            <Count
              label={"의사"}
              value={0}
              max={10}
              min={0}
              onChange={() => {}}
            />
          </Layout>

          <Layout>
            <Count
              label={"정치인"}
              value={0}
              max={10}
              min={0}
              onChange={() => {}}
            />
          </Layout>
        </Layout>

        <Layout
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={toRem(20)}
        >
          <Button isSmall onClick={handleCloseSetting}>
            초기화
          </Button>
          <Button isSmall onClick={handleCloseSetting}>
            완료
          </Button>
        </Layout>
      </GameSettingStyle.Box>
    </GameSettingStyle.Container>
  );
};

export default GameSetting;
