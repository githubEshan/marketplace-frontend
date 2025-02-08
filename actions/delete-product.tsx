import axios from "axios";

export const deleteProduct = async (URL: string, userId: string) => {
  try {
    await axios.delete(URL, {
      headers: {
        "Content-Type": "application/json",
      },
      data: { userId }, // Ensure this is properly structured
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
