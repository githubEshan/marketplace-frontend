"use client";

import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";

interface FilterPageProps {
  data: string; // Display name for the filter
  valueKey: string; // Key for the query parameter
  options: string[]; // Available filter options
}

const Filter: React.FC<FilterPageProps> = ({ data, valueKey, options }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());

  
    if (currentParams.get(valueKey) === id) {
      currentParams.delete(valueKey);
    } else {
      currentParams.set(valueKey, id);
    }

    // Update the URL with the new query parameters
    const queryString = currentParams.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;

    router.push(newUrl);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{data}</h3>
      <hr className="my-4" />
      <div className="flex gap-4">
        {options.map((option) => (
          <Button
            key={option}
            onClick={() => onClick(option)}
            className={cn(
              "rounded-md text-sm text-gray-800 bg-white border border-gray-300",
              selectedValue === option && "bg-black text-white"
            )}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Filter;
