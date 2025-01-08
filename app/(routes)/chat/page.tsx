import getChats from "@/actions/get-chats";
import AllChats from "@/components/sidebar";

interface ChatProps {}

const ChatPage: React.FC<ChatProps> = async () => {
  const chats = await getChats();
  return (
    <div>
      Messages
      <div>
        <AllChats data={chats} />
      </div>
    </div>
  );
};

export default ChatPage;
