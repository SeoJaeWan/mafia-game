import Image from "next/image";
import FireStyle from "./fire.style";
import useGame from "@/hooks/useGame";

const Fire = () => {
  const { timePeriod } = useGame();

  return (
    <FireStyle.Container>
      <Image
        src={`/assets/room/${timePeriod}_fire.png`}
        alt={""}
        width={120 * 8}
        height={120}
      />
    </FireStyle.Container>
  );
};

export default Fire;
