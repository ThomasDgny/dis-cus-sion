"use client";
import React, { FormEvent, useState } from "react";

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
import { Topics } from "@/types/Types";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Database } from "@/lib/database.type";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function EditCategory({ topicData }: { topicData: Topics }) {
  const supabase = createClientComponentClient<Database>();
  const { toast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    topicData?.category ?? "Select",
  );
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  async function handleUpdateDescription(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("topics")
      .update({ category: selectedCategory })
      .eq("id", topicData.id);

    setLoading(false);

    if (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong.",
      });
      return null;
    }
    toast({
      description: "Your changes have been saved.",
    });
  }

  return (
    <div>
      <form
        className="grid grid-cols-5 gap-4"
        onSubmit={handleUpdateDescription}
      >
        <Label htmlFor="bio" className="text-right">
          Category
        </Label>
        <Select onValueChange={handleCategoryChange}  defaultValue={selectedCategory}>
          <SelectTrigger className="col-span-3">
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

        <Button type="submit" variant={"ghost"} disabled={loading}>
          {!loading ? "Update" : "Loading"}
        </Button>
      </form>
    </div>
  );
}
