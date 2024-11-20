import useGame from "@/hooks/game/useGame";
import DayBackgroundStyle, {
  IDayBackgroundStyleProps,
} from "./dayBackground.style";
import StripDollar from "@/styles/utils/stripDollar";

interface IDayBackgroundProps extends StripDollar<IDayBackgroundStyleProps> {
  children: React.ReactNode;
}

const DayBackground: React.FC<IDayBackgroundProps> = (props) => {
  const { children, isShow } = props;
  const { time } = useGame();

  return (
    <DayBackgroundStyle $isShow={isShow} $time={time}>
      {children}
    </DayBackgroundStyle>
  );
};

export default DayBackground;
