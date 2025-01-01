import { Product } from "@/types";
import NoResults from "@/components/ui/no-results";
import UserProductCard from "./user-product-card";
import { currentUser } from "@clerk/nextjs/server";

interface UserProductListProps {
  title: string;
  items: Product[];
}

const UserProductList: React.FC<UserProductListProps> = async ({
  title,
  items,
}) => {
  const user = await currentUser();
  const current_user = user?.id;
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {items.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items
          .filter((item) => item.userId === current_user)
          .map((item) => (
            <UserProductCard key={item.id} data={item} />
          ))}
      </div>
    </div>
  );
};

export default UserProductList;
