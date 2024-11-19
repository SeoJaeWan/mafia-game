import Card from "@/components/atoms/room/card";
import JobStyle from "./job";

const Job = () => {
  return (
    <JobStyle.Container>
      <Card width={70} />

      <JobStyle.Info>
        <p>
          직업 : <strong>마피아</strong>
        </p>
        <p>
          당신은 마피아입니다. 시민을 죽이고 끝까지 들키면 안됩니다.
          <br />밤 시간에 다른 마피아와 함께 누군가를 죽일 플레이어를
          선택하세요.
        </p>
      </JobStyle.Info>
    </JobStyle.Container>
  );
};

export default Job;
