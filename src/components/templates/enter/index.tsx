"use client";
import Input from "@/components/atoms/common/input";
import Title from "@/components/atoms/common/title";
import Button from "@/components/atoms/common/button";
import { Controller, useForm } from "react-hook-form";
import useGame, { EnterGameType } from "@/hooks/game/useGame";
import EnterTemplateStyle from "./enter.style";

interface IEnterTemplateProps {
  roomId: string;
  type: EnterGameType;
}

const EnterTemplate: React.FC<IEnterTemplateProps> = (props) => {
  const { roomId, type } = props;
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
    },
  });
  const { game } = useGame();

  const handleCreateRoom = (data: { name: string }) => {
    const { name } = data;

    game.enterRoom(roomId, name, type);
  };

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
              value={value}
              maxLength={6}
              placeholder={"닉네임을 입력해주세요."}
              onChange={onChange}
            />
          )}
        />

        <Button type={"submit"}>만들기</Button>
      </EnterTemplateStyle.Form>
    </EnterTemplateStyle.Container>
  );
};

export default EnterTemplate;
