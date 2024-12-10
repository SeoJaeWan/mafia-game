"use client";
import Input from "@/components/atoms/common/input";
import Title from "@/components/atoms/common/title";
import Button from "@/components/atoms/common/button";
import { Controller, useForm } from "react-hook-form";
import useGame, { EnterGameType } from "@/hooks/useGame";
import EnterTemplateStyle from "./enter.style";
import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import createRoomId from "@/utils/createRoomId";

interface IEnterTemplateProps {
  type: EnterGameType;
}

const EnterTemplate: React.FC<IEnterTemplateProps> = (props) => {
  const { type } = props;
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
    },
  });
  const { joinRoom, createRoom } = useGame();
  const params = useParams<{ roomId: string }>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleCreateRoom = (data: { name: string }) => {
    const { name } = data;

    if (type === "join") {
      joinRoom({ roomId: params.roomId, name });
    } else {
      const roomId = createRoomId();

      createRoom({ roomId, name });
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <EnterTemplateStyle.Container>
      <Title>{type === "create" ? "방 만들기" : "방 참가하기"}</Title>

      <EnterTemplateStyle.Form onSubmit={handleSubmit(handleCreateRoom)}>
        <Controller
          name={"name"}
          rules={{ required: "이름을 입력해주세요." }}
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              ref={inputRef}
              value={value}
              maxLength={5}
              placeholder={"닉네임을 입력해주세요."}
              onChange={onChange}
            />
          )}
        />

        <Button type={"submit"}>
          {type === "create" ? "만들기" : "참가하기"}
        </Button>
      </EnterTemplateStyle.Form>
    </EnterTemplateStyle.Container>
  );
};

export default EnterTemplate;
