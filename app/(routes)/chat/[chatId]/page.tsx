import getChat from "@/actions/get-chat";
import MessagesPage from "./components/message-chat";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}
const ChatPage: React.FC<ChatPageProps> = async ({ params }) => {
  const chat = await getChat(params.chatId);
  return (
    <div>
      <MessagesPage data={chat} />
    </div>
  );
};

export default ChatPage;
