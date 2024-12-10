import StripDollar from "@/styles/utils/stripDollar";
import GameSettingStyle, { IGameSettingStyleProps } from "./gameSetting.style";
import Layout from "@/styles/layout";
import Count from "@/components/atoms/create/count";
import Button from "@/components/atoms/common/button";
import { useState } from "react";
import { Controller } from "react-hook-form";
import Label from "@/components/atoms/create/label";
import { playableRoles } from "@/hooks/useGame";
import useGame from "@/hooks/useGame";

interface IGameSettingProps extends StripDollar<IGameSettingStyleProps> {
  handleGameSetting: () => void;
}

const GameSetting: React.FC<IGameSettingProps> = (props) => {
  const { isGameSetting, handleGameSetting } = props;
  const [boxClass, setBoxClass] = useState("");
  const { form, resetPlayable } = useGame();
  const control = form.control;

  const handleCloseSetting = () => {
    setBoxClass("close");

    setTimeout(() => {
      handleGameSetting();
      setBoxClass("");
    }, 300);
  };

  return (
    <GameSettingStyle.Container $isGameSetting={isGameSetting}>
      <GameSettingStyle.Box className={boxClass}>
        <GameSettingStyle.Title>게임 설정</GameSettingStyle.Title>

        <Layout
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"20px"}
          marginTop={"40px"}
          marginBottom={"30px"}
        >
          {Object.values(playableRoles).map(({ label, name }) => (
            <Controller
              key={label}
              control={control}
              name={name}
              render={({ field: { value, onChange } }) => (
                <Label label={label}>
                  <Count value={value} min={0} onChange={onChange} />
                </Label>
              )}
            />
          ))}
        </Layout>

        <Layout
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"20px"}
        >
          <Button isSmall onClick={resetPlayable}>
            자동 설정
          </Button>
        </Layout>

        {/* <Layout
          display={"flex"}
          flexDirection={"column"}
          gap={"20px"}
          //
          marginTop={"50px"}
          marginBottom={"30px"}
        >
          <Controller
            control={control}
            name={"time"}
            render={({ field: { value, onChange } }) => (
              <Label label={"낮 시간/초"}>
                <Count value={value} min={0} onChange={onChange} />
              </Label>
            )}
          />
        </Layout> */}

        <Layout
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"20px"}
        >
          <Button isSmall onClick={handleCloseSetting}>
            닫기
          </Button>
        </Layout>
      </GameSettingStyle.Box>
      <GameSettingStyle.Background onClick={handleCloseSetting} />
    </GameSettingStyle.Container>
  );
};

export default GameSetting;
