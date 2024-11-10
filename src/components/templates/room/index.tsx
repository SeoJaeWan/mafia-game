"use client";
import { useState } from "react";
import Input from "@/components/atoms/common/input";
import Layout from "@/styles/layout";
import Title from "@/components/atoms/common/title";
import toRem from "@/styles/utils/toRem";
import Button from "@/components/atoms/common/button";
import TextButton from "@/components/atoms/common/textButton/textButton";
import GameSetting from "@/components/molecules/room/gameSetting";
import { Controller, FormProvider } from "react-hook-form";
import useRoomForm, { IFormValues } from "@/hooks/useRoomForm";
import createRoomId from "@/utils/createRoomId";
import { useRouter } from "next/navigation";
import useGame from "@/hooks/useGame";

const RoomTemplate = () => {
  const [gameSetting, setGameSetting] = useState(false);
  const router = useRouter();

  const { form } = useRoomForm();
  const { control, handleSubmit } = form;
  const { setOptions } = useGame();

  const handleGameSetting = () => {
    setGameSetting((prev) => !prev);
  };

  const handleCreateRoom = (data: IFormValues) => {
    const roomId = createRoomId();

    localStorage.setItem("room", JSON.stringify(data));
    router.push(`/room/${roomId}`);

    setOptions({ roomId, ...data });
  };

  return (
    <FormProvider {...form}>
      <Title>방 만들기</Title>

      <Layout
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"flex-end"}
        gap={toRem(5)}
        margin={`${toRem(20)} 0 ${toRem(60)}`}
      >
        <Controller
          name={"nickname"}
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              width={toRem(500)}
              height={toRem(60)}
              //
              value={value}
              maxLength={6}
              placeholder={"닉네임을 입력해주세요."}
              onChange={onChange}
            />
          )}
        />
        <TextButton onClick={handleGameSetting}>게임 설정</TextButton>
      </Layout>

      <Button onClick={handleSubmit(handleCreateRoom)}>만들기</Button>

      <GameSetting isShow={gameSetting} handleGameSetting={handleGameSetting} />
    </FormProvider>
  );
};

export default RoomTemplate;
