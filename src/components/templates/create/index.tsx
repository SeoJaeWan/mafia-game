"use client";
import Input from "@/components/atoms/common/input";
import Layout from "@/styles/layout";
import Title from "@/components/atoms/common/title";
import Button from "@/components/atoms/common/button";
import { Controller, FormProvider, useForm } from "react-hook-form";
import createRoomId from "@/utils/createRoomId";
import useGame from "@/hooks/game/useGame";

const CreateTemplate = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
    },
  });
  const { enterRoom } = useGame();

  const handleCreateRoom = (data: { name: string }) => {
    const { name } = data;
    const roomId = createRoomId();

    enterRoom(roomId, name);
  };

  return (
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
          gap={"5px"}
          margin={`20px 0 60px`}
        >
          <Controller
            name={"name"}
            rules={{ required: "이름을 입력해주세요." }}
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                width={"500px"}
                height={"60px"}
                //
                value={value}
                maxLength={6}
                placeholder={"닉네임을 입력해주세요."}
                onChange={onChange}
              />
            )}
          />
        </Layout>

        <Button type={"submit"}>만들기</Button>
      </Layout>
    </form>
  );
};

export default CreateTemplate;
