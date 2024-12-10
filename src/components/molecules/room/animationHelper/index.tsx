import AnimationHelperStyle from "./animationHelper.style";
import Character from "@/components/atoms/common/character";
import useGame, { playableRoles, PlayerList } from "@/hooks/useGame";
import Layout from "@/styles/layout";

export const DayAnimationDuration = 3 * 1000;
export const JobInfoDuration = 10 * 1000;

export const EventAnimation = 4 * 1000;

const AnimationHelper = () => {
  const { player, playerList, turn } = useGame();
  const roleInfo = playableRoles[player.role];

  const showJobInfo = turn === "intro";
  const showFinish = turn === "citizenWin" || turn === "mafiaWin";

  const [winner, loser] = playerList.reduce(
    (acc, cur) => {
      if (turn === "mafiaWin") {
        if (cur.role === "mafia") {
          acc[0].push(cur);
        } else {
          acc[1].push(cur);
        }
      } else {
        if (cur.role === "mafia") {
          acc[1].push(cur);
        } else {
          acc[0].push(cur);
        }
      }

      return acc;
    },
    [[] as PlayerList, [] as PlayerList]
  );

  return (
    <>
      {showFinish && (
        <AnimationHelperStyle.FinishContainer $duration={EventAnimation}>
          <Layout
            position={"relative"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
          >
            {loser.map(({ color, name }) => {
              return (
                <AnimationHelperStyle.Loser key={name}>
                  <Character characterRole={"die"} color={color}>
                    {name}
                  </Character>
                </AnimationHelperStyle.Loser>
              );
            })}
          </Layout>
          <Layout
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
          >
            {winner.map(({ color, name, role }) => {
              return (
                <AnimationHelperStyle.Winner key={name}>
                  <Character characterRole={role} color={color}>
                    {name}
                  </Character>
                </AnimationHelperStyle.Winner>
              );
            })}
          </Layout>
        </AnimationHelperStyle.FinishContainer>
      )}

      {showJobInfo && (
        <AnimationHelperStyle.JobContainer $duration={JobInfoDuration}>
          <AnimationHelperStyle.Playable>
            <Character characterRole={roleInfo.name} />
          </AnimationHelperStyle.Playable>

          <AnimationHelperStyle.Information>
            <AnimationHelperStyle.Title>
              {roleInfo.label}
            </AnimationHelperStyle.Title>
            <AnimationHelperStyle.Contents>
              {roleInfo.info}
            </AnimationHelperStyle.Contents>
          </AnimationHelperStyle.Information>
        </AnimationHelperStyle.JobContainer>
      )}
    </>
  );
};

export default AnimationHelper;
