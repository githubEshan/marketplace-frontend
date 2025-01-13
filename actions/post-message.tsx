import axios from "axios";

export const createMessage = async (data: any) => {
  const chatId = "2d3237e8-d5cb-41e1-b6f7-002e9c4001db";
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/chats/${chatId}/messages`;
  const response = await axios.post(URL, data, {
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
