import getChats from "@/actions/get-chats";
import AllChats from "@/components/sidebar";

interface ChatsProps {}

const ChatsPage: React.FC<ChatsProps> = async () => {
  const chats = await getChats();
  return (
    <div>
      Messages
      <div className="margin:auto ">
        <AllChats data={chats} />
      </div>
    </div>
  );
};

export default ChatsPage;
