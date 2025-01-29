import { Chat } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/chats`;

interface Query {
  productId?: string;
}

const getChats = async (query: Query): Promise<Chat[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      productId: query.productId,
    },
  });
  const res = await fetch(url);
  return res.json();
};

export default getChats;
