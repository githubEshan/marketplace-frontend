import getProducts from "@/actions/get-products";
import getProduct from "@/actions/get-product";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);

  const suggestProducts = await getProducts({
    categoryId: product?.category?.id,
  });

  return <div className=" bg-white">
    Individual Product
    </div>;
};

export default ProductPage;
