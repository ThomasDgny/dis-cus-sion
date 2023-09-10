import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { category } from "@/mock/Category";
import React from "react";

export default function HomeHeader() {
  return (
    <div className="w-full">
      <div className="flex w-full gap-3 overflow-x-auto">
        {category.map((item) => (
          <Button
            variant={"ghost"}
            className="whitespace-nowrap py-1"
            key={item.id}
          >
            {item.category_name}
          </Button>
        ))}
      </div>
    </div>
  );
}
