import useGame from "@/hooks/useGame";
import SystemMessageStyle from "./systemMessage.style";

const SystemMessage = () => {
  const { messageList } = useGame();
  const systemMessage = messageList
    .filter((message) => message.isSystem)
    .slice(-1)[0];

  if (!systemMessage?.message) {
    return null;
  }

  return (
    <SystemMessageStyle.Text key={systemMessage.message}>
      {systemMessage.message}
    </SystemMessageStyle.Text>
  );
};

export default SystemMessage;
