"use client";

import { useRouter } from "next/navigation";
import Button from "../ui/button";
import { Heading } from "../ui/heading";

const ProductForm = () => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/sell/`);
  };

  return (
    <div className="mr-8 ml-5 flex items-right justify-between">
      <div>
        <Button className="mr-4">Sell A Product</Button>
      </div>
    </div>
  );
};

export default ProductForm;
