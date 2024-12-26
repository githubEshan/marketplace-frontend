import getProducts from "@/actions/get-products";
import Button from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { currentUser } from "@clerk/nextjs/server";
import UserProductList from "@/components/user/user-product-list";

const Sell = async () => {
  const user = await currentUser();
  const current_user = user?.id;

  const userProducts = await getProducts({
    userId: current_user,
  });

  return (
    <>
      <div className="mt-3 mr-8 ml-5 flex items-center justify-between">
        <Heading title={`My Products`} description="" />
        <Button className="mt-4">Sell A Product</Button>
      </div>
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <UserProductList title={""} items={userProducts} />
      </div>
    </>
  );
};

export default Sell;
