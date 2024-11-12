"use client";
import { useState } from "react";
import Input from "@/components/atoms/common/input";
import Layout from "@/styles/layout";
import Title from "@/components/atoms/common/title";
import toRem from "@/styles/utils/toRem";
import Button from "@/components/atoms/common/button";
import TextButton from "@/components/atoms/common/textButton/textButton";
import GameSetting from "@/components/molecules/create/gameSetting";
import { Controller, FormProvider } from "react-hook-form";
import useRoomForm, { IFormValues } from "@/hooks/useRoomForm";
import createRoomId from "@/utils/createRoomId";
import useGame from "@/hooks/useGame";

const CreateTemplate = () => {
  const [gameSetting, setGameSetting] = useState(false);

  const { form } = useRoomForm();
  const { control, handleSubmit } = form;
  const { createRoom } = useGame();

  const handleGameSetting = () => {
    setGameSetting((prev) => !prev);
  };

  const handleCreateRoom = (data: IFormValues) => {
    const roomId = createRoomId();

    createRoom({ roomId, ...data });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(handleCreateRoom)}>
        <Layout
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
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
              name={"name"}
              rules={{ required: "이름을 입력해주세요." }}
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

          <Button type={"submit"}>만들기</Button>

          <GameSetting
            isShow={gameSetting}
            handleGameSetting={handleGameSetting}
          />
        </Layout>
      </form>
    </FormProvider>
  );
};

export default CreateTemplate;
