import axios from "axios";

export const createMessage = async (text: string, chatId : string) => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/chats/${chatId}/messages`;
  const response = await axios.post(URL, text, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Failed to create product");
  }
};
