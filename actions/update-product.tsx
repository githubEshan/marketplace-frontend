import axios from "axios";

export const updateProduct = async (
  storeId: string,
  productId: string,
  data: any
) => {
  const URL = `/api/${storeId}/products/${productId}`;
  const response = await axios.patch(URL, data);
  return response;
};
