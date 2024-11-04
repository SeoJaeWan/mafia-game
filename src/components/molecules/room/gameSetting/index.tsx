import StripDollar from "@/styles/utils/stripDollar";
import GameSettingStyle, { IGameSettingStyleProps } from "./gameSetting.style";
import Layout from "@/styles/layout";
import Count from "@/components/atoms/room/count";
import toRem from "@/styles/utils/toRem";
import Button from "@/components/atoms/common/button";
import { useState } from "react";
import useRoomFormContext from "@/hooks/room/useRoomFormContext";
import { Controller } from "react-hook-form";
import { playableRoles } from "@/hooks/room/useRoomForm";

interface IGameSettingProps extends StripDollar<IGameSettingStyleProps> {
  handleGameSetting: () => void;
}

const GameSetting: React.FC<IGameSettingProps> = (props) => {
  const { isShow, handleGameSetting } = props;
  const [boxClass, setBoxClass] = useState("");

  const {
    control,
    totalPlayers,
    //
    updateTotalPlayers,
    resetPlayable,
  } = useRoomFormContext();

  const handleCloseSetting = () => {
    updateTotalPlayers();
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
          <Controller
            control={control}
            name={"total"}
            render={({ field: { value, onChange } }) => (
              <Layout>
                <Count
                  label={"전체 인원"}
                  value={value}
                  min={0}
                  isError={totalPlayers > value}
                  errorValue={totalPlayers}
                  onChange={onChange}
                />
              </Layout>
            )}
          />

          {playableRoles.map(({ label, name }) => (
            <Controller
              key={label}
              control={control}
              name={name}
              render={({ field: { value, onChange } }) => (
                <Layout>
                  <Count
                    label={label}
                    value={value}
                    min={0}
                    onChange={onChange}
                  />
                </Layout>
              )}
            />
          ))}
        </Layout>

        <Layout
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={toRem(20)}
        >
          <Button isSmall onClick={resetPlayable}>
            자동 설정
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
