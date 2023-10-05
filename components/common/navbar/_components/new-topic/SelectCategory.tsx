"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { category } from "@/mock/Category";

interface SelectCategoryProps {
  setCategory: Dispatch<SetStateAction<string>>;
}

export function SelectCategory({ setCategory }: SelectCategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  useEffect(() => {
    setCategory(selectedCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  return (
    <Select onValueChange={handleCategoryChange} required>
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="max-h-52 overflow-y-auto">
          <SelectLabel>Category</SelectLabel>
          {category.map((item) => (
            <SelectItem key={item.id} value={item.category_name}>
              {item.category_name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
