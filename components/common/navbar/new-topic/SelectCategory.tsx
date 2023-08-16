"use client";
import React, { SetStateAction, useEffect, useState } from "react";

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

export function SelectCategory() {
  const [select, setSelect] = useState<SetStateAction<string>>("");

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue
          placeholder="Select a category"
        />
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
