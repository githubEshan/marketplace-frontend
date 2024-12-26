"use client";

import { Product } from "@/types";
import Image from "next/image";
import { Edit } from "lucide-react";
import Currency from "@/components/ui/currency";
import { useRouter } from "next/navigation";


interface UserProductCard {
  data: Product;
}
const UserProductCard: React.FC<UserProductCard> = ({ data }) => {
  const router = useRouter();

  const handleClick = () => {
    
  }

  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          alt="Image"
          src={data?.images?.[0].url}
          fill
          className="aspect-square object-cover rounded-md"
        />

        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5 ">
          <div className="flex gap-x-6 justify-center">
            <Edit onClick={() => {}} />
          </div>
        </div>
      </div>
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="font-semibold text-lg">{data.category?.name}</p>
      </div>
      <div className="flex items-center justify-between">
        <Currency value={data?.price} />
      </div>
    </div>
  );
};

export default UserProductCard;
