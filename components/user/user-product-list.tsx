import { Product } from "@/types";
import NoResults from "@/components/ui/no-results";
import UserProductCard from "./user-product-card";

interface UserProductListProps {
  title: string;
  items: Product[];
}

const UserProductList: React.FC<UserProductListProps> = ({ title, items }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {items.length === 0 && <NoResults />}
      <div className="grid gridd-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <UserProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default UserProductList;
