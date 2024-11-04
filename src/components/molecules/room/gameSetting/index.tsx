import StripDollar from "@/styles/utils/stripDollar";
import GameSettingStyle, { IGameSettingStyleProps } from "./gameSetting.style";
import Layout from "@/styles/layout";
import Count from "@/components/atoms/room/count";
import toRem from "@/styles/utils/toRem";
import Button from "@/components/atoms/common/button";
import { useState } from "react";
import useRoomFormContext from "@/hooks/room/useRoomFormContext";
import { Controller } from "react-hook-form";
import { playableRoles, playMode } from "@/hooks/room/useRoomForm";
import Select from "@/components/atoms/room/select";
import Label from "@/components/atoms/room/label";

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
    }, 300);
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
              <Label label={"전체 인원"}>
                <Count
                  value={value}
                  min={0}
                  isError={totalPlayers > value}
                  errorValue={totalPlayers}
                  onChange={onChange}
                />
              </Label>
            )}
          />

          {playableRoles.map(({ label, name }) => (
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
          gap={toRem(20)}
        >
          <Button isSmall onClick={resetPlayable}>
            자동 설정
          </Button>
        </Layout>

        <Layout
          display={"flex"}
          flexDirection={"column"}
          gap={toRem(20)}
          //
          marginTop={toRem(50)}
          marginBottom={toRem(30)}
        >
          <Controller
            control={control}
            name={"time"}
            render={({ field: { value, onChange } }) => (
              <Label label={"낮 시간/초"}>
                <Count
                  value={value}
                  min={0}
                  isError={totalPlayers > value}
                  errorValue={totalPlayers}
                  onChange={onChange}
                />
              </Label>
            )}
          />

          <Controller
            control={control}
            name={"mode"}
            render={({ field: { value, onChange } }) => (
              <Label label={"게임 모드"}>
                <Select
                  width={toRem(139)}
                  height={toRem(24)}
                  value={value.label}
                  onChange={onChange}
                >
                  {playMode.map((mode) => (
                    <Select.Option value={mode} key={mode.label}>
                      {mode.label}
                    </Select.Option>
                  ))}
                </Select>
              </Label>
            )}
          />
        </Layout>

        <Layout
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={toRem(20)}
        >
          <Button isSmall onClick={handleCloseSetting}>
            완료
          </Button>
        </Layout>
      </GameSettingStyle.Box>
    </GameSettingStyle.Container>
  );
};

export default GameSetting;
