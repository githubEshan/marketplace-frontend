import getChats from "@/actions/get-chats";
import AllChats from "@/components/chat-page-sidebar";

interface ChatsProps {}

const ChatsPage: React.FC<ChatsProps> = async () => {
  const chats = await getChats({ productId: "null" });

  return (
    <div>
      <div className="margin:auto ">
        <AllChats data={chats} />
      </div>
    </div>
  );
};

export default ChatsPage;
