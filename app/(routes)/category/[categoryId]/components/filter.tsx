"use client"; // Enables client-side interactivity

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FilterForm({
  filters,
}: {
  filters: { condition?: string };
}) {
  const router = useRouter();
  const [condition, setCondition] = useState(filters.condition || "");

  const onClick = (newCondition: string) => {
    let updatedCondition = "";

    if (condition === newCondition) {
      // Deselect if the same condition is clicked
      setCondition("");
    } else {
      updatedCondition = newCondition;
      setCondition(newCondition);
    }

    const params = new URLSearchParams();

    if (updatedCondition) {
      params.append("condition", updatedCondition);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex space-x-4">
      <button
        type="button"
        className={`px-4 py-2 rounded border ${
          condition === "new" ? "bg- text-black ite" : "bg-gray-200"
        }`}
        onClick={() => onClick("new")}
      >
        New
      </button>
      <button
        type="button"
        className={`px-4 py-2 rounded border ${
          condition === "used" ? "bg-black text-white" : "bg-gray-200"
        }`}
        onClick={() => onClick("used")}
      >
        Used
      </button>
    </div>
  );
}
