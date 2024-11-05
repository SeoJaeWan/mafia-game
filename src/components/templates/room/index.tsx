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
import createRoomName from "@/utils/createRoomName";
import { useRouter } from "next/navigation";

const RoomTemplate = () => {
  const [gameSetting, setGameSetting] = useState(false);
  const router = useRouter();

  const { form } = useRoomForm();
  const { control, handleSubmit } = form;

  const handleGameSetting = () => {
    setGameSetting((prev) => !prev);
  };

  const handleCreateRoom = (data: IFormValues) => {
    const roomName = createRoomName();

    localStorage.setItem("room", JSON.stringify(data));
    router.push(`/room/${roomName}`);
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
          name={"title"}
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              width={toRem(500)}
              height={toRem(60)}
              //
              value={value}
              placeholder={"방 제목을 입력해주세요."}
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
