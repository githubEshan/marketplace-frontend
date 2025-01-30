import getCategory from "@/actions/get-category";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import ProductCard from "@/components/ui/product-card";
import FilterForm from "./components/filter";

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    condition?: string;
  };
}

const Categorypage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const products = await getProducts({
    categoryId: params.categoryId,
  });

  const category = await getCategory(params.categoryId);
  let filteredProducts = products;

  if (searchParams.condition) {
    filteredProducts = products.filter(
      (item) => item.condition === searchParams.condition
    );
  }

  return (
    <div className="bg-white mr-4 ml-4 ">
      <Container>
        <Billboard data={category.billboard} />
        <div className="px-4 sm:px-8 pb-24 ml-8 mr-10">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-10 mb-5">
            <FilterForm filters={{ condition: searchParams.condition }}/>
          </div>
          <div className="mt-6 lg:col-span-4 lg:mt-0">
            {filteredProducts.length === 0 ? (
              <div className="text-center text-gray-500">No products found</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map((item) => (
                  <div key={item.id} className="relative">
                    <ProductCard data={item} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Categorypage;
