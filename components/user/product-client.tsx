"use client";

import { Product } from "@/types";
import Button from "../ui/button";
import { Heading } from "../ui/heading";
import { useRouter } from "next/navigation";

const ProductClient = () => {
  const router = useRouter();

  return (
    <div className="mt-3 mr-8 ml-5 flex items-center justify-between">
      <Heading title={`My Products`} description="" />
      <Button className="mt-4" onClick={() => router.push(`/sell/new`)}>
        Sell A Product
      </Button>
    </div>
  );
};

export default ProductClient;
