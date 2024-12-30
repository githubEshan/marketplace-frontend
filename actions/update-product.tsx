import axios from "axios";

export const updateProduct = async (URL: any, data: any) => {
  const response = await axios.patch(URL, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Failed to update product");
  }
};
