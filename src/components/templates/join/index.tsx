"use client";
import Button from "@/components/atoms/common/button";
import Input from "@/components/atoms/common/input";
import Title from "@/components/atoms/common/title";
import useGame from "@/hooks/useGame";
import Layout from "@/styles/layout";
import toRem from "@/styles/utils/toRem";
import { useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

const JoinTemplate = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
    },
  });
  const { joinRoom } = useGame();
  const { id } = useParams<{ id: string }>();

  const handleJoinRoom = (data: { name: string }) => {
    const { name } = data;

    joinRoom(id, name);
  };

  return (
    <form>
      <Layout
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Title>방 참가하기</Title>

        <Layout
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"flex-end"}
          margin={`${toRem(20)} 0 ${toRem(60)}`}
        >
          <Controller
            name={"name"}
            control={control}
            rules={{
              required: "닉네임을 입력해주세요.",
            }}
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
        </Layout>

        <Button onClick={handleSubmit(handleJoinRoom)} type={"submit"}>
          만들기
        </Button>
      </Layout>
    </form>
  );
};

export default JoinTemplate;
