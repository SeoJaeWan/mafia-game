"use client";
import Input from "@/components/atoms/common/input";
import Title from "@/components/atoms/common/title";
import Button from "@/components/atoms/common/button";
import { Controller, useForm } from "react-hook-form";
import { EnterGameType, EnterRoom } from "@/hooks/useGame";
import EnterTemplateStyle from "./enter.style";
import { useEffect, useRef } from "react";

interface IEnterTemplateProps {
  roomId: string;
  type: EnterGameType;
  //
  enterRoom: (room: EnterRoom) => void;
}

const EnterTemplate: React.FC<IEnterTemplateProps> = (props) => {
  const {
    roomId,
    type,
    //
    enterRoom,
  } = props;
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
    },
  });
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleCreateRoom = (data: { name: string }) => {
    const { name } = data;

    enterRoom({ roomId, name });
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
              maxLength={6}
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
