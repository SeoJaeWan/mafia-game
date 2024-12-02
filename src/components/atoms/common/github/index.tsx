import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

interface IGithubProps {
  size: number;
}

const Github: React.FC<IGithubProps> = (props) => {
  const { size } = props;

  return (
    <Link href={"https://github.com/SeoJaeWan/mafia-game"} target={"_blank"}>
      <FaGithub size={size} />
    </Link>
  );
};

export default Github;
