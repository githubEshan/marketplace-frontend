import axios from "axios";

export const createMessage = async (data: any) => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/chats/${data.chatId}/messages`;
  const response = await axios.post(URL, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Failed to create message");
  }
};
