"use client";

import Button from "../ui/button";
import { Heading } from "../ui/heading";
import { useRouter } from "next/navigation";

const ProductClient = () => {
  const router = useRouter();

  return (
    <div className="mt-3 ml-14 mr-16 flex items-center justify-between">
      <Heading title={`My Products`} />
      <Button className="mt-4" onClick={() => router.push(`/sell/new`)}>
        List A Product
      </Button>
    </div>
  );
};

export default ProductClient;
