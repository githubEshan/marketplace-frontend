import getProducts from "@/actions/get-products";
import { currentUser } from "@clerk/nextjs/server";
import UserProductList from "@/components/user/user-product-list";
import ProductClient from "@/components/user/product-client";

const Sell = async () => {
  const user = await currentUser();
  const current_user = user?.id;

  const userProducts = await getProducts({
    userId: current_user,
  });

  return (
    <>
      <ProductClient  />
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <UserProductList title={""} items={userProducts} />
      </div>
    </>
  );
};

export default Sell;
