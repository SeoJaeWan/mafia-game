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
  const { timePeriod } = useGame();

  return (
    <DayBackgroundStyle $isShow={isShow} $timePeriod={timePeriod}>
      {children}
    </DayBackgroundStyle>
  );
};

export default DayBackground;
