import { Chat } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/chats`;

const getChat = async (id: string): Promise<Chat> => {
  const res = await fetch(`${URL}/${id}`);
  return res.json();
};

export default getChat;
