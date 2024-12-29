import axios from "axios";

export const createProduct = async (payload: any) => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;
  const response = await axios.post(URL, payload, {
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
