import getCategories from "@/actions/get-categories";
import getProduct from "@/actions/get-product";
import { ProductForm } from "./components/product-form";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  try {
    const { productId } = params;

    if (!productId) {
      throw new Error("Missing ProductId");
    }

    const product = await getProduct(productId);

    const categories = await getCategories();

    return (
      <div className="flex-col">
        <div className="space-y-2 p-8">
          <ProductForm categories={categories} initialData={product} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch billboard:", error);
    return <div>Something went wrong.</div>;
  }
};

export default ProductPage;
