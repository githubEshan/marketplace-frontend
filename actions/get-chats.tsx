import { Chat } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/chats`;

const getCategories = async (): Promise<Chat[]> => {
  const res = await fetch(URL);
  return res.json();
};

export default getCategories;
