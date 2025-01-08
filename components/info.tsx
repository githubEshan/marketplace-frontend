"use client";

import { Product } from "@/types";
import Currency from "./ui/currency";
import Button from "@/components/ui/button";
import { MessageCircleIcon, ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const router = useRouter();

  const addToCart = () => {
    cart.addItem(data);
  };


  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />

      <div className="flex items-center gap-x-4">
        <h3 className="font-semibold text-black">Condition:</h3>
        <div>{data.condition}</div>
      </div>

      <div className="flex items-center gap-x-4">
        <h3 className="font-semibold text-black">Pickup Location</h3>
        <div>{data.location}</div>
      </div>
      <div className="flex items-center gap-x-4">
        <h3 className="font-semibold text-black">Description</h3>
        <div>{data.description}</div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={() => router.push("/chat")} 
          className="flex items-center gap-x-2">
          Message Seller
          <MessageCircleIcon />
        </Button>
        <Button onClick={addToCart} className="flex items-center gap-x-2">
          Add to Cart
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Info;
