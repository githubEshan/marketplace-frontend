import getProducts from "@/actions/get-products";
import getProduct from "@/actions/get-product";
import Container from "@/components/ui/container";
import ProductList from "@/components/ui/product-list";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import getChats from "@/actions/get-chats";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);
  const productChats = await getChats({
    productId: params.productId,
  });

  const suggestProducts = await getProducts({
    categoryId: product?.categoryId?.id,
  }); 

  console.log(productChats);
  return (
    <div className=" bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={product} productChat={productChats} />
            </div>
          </div>
          <hr className="my-10" />
          <ProductList title="Related Items" items={suggestProducts} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
