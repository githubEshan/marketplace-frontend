import getChats from "@/actions/get-chats";
import AllChats from "@/components/all-chats";

interface ChatsProps {}

const ChatsPage: React.FC<ChatsProps> = async () => {
  const chats = await getChats();
  return (
    <div>
      <div className="margin:auto ">
        <AllChats data={chats} />
      </div>
    </div>
  );
};

export default ChatsPage;
