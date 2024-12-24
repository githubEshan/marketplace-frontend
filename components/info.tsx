"use client";
import { Product } from "@/types";
import Currency from "./ui/currency";
import Button from "./ui/button";
import { ShoppingCart } from "lucide-react";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900"> {data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Condition:</h3>
          <div>{data.condition}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Description</h3>
          <div>{data.description}</div>
        </div>

        <div className="flex items-center gap-x-4 gap-">
          <h3 className="font-semibold text-black">
            Location for product to be picked up:
          </h3>
          <div>{data.location}</div>
        </div>
        <div className="mt-10 flex items-center gap-x-3">
          <Button>
            Add to Cart
            <ShoppingCart />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Info;
