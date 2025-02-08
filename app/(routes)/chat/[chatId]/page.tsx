import getChat from "@/actions/get-chat";

import getChats from "@/actions/get-chats";
import ChatPageSideBar from "@/components/chat-page-sidebar";
import ChatInterface from "./components/chat-interface";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}
const ChatPage: React.FC<ChatPageProps> = async ({ params }) => {
  const chats = await getChats({
    productId: "null",
  });
  const chat = await getChat(params.chatId);
  return (
    <div className="flex h-screen w-full ">

      <div className="w-80 shrink-0 border-r">
        <ChatPageSideBar data={chats} />
      </div>

      <div className="flex-1">
        <ChatInterface data={chat} />
      </div>
    </div>
  );
};

export default ChatPage;
