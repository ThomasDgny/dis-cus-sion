"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, XCircle } from "lucide-react";
import { category } from "@/lib/Category";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface queriesProps {
  query: string | null;
  category: string | null;
}

interface SearchFormProps {
  queries?: queriesProps;
}

export default function SearchFormV2({ queries }: SearchFormProps) {
  const prevSearch: string = queries?.query || "";
  const router = useRouter();

  async function handleSearch(formData: FormData) {
    const search = formData.get("search") as string;
    const url = `/search?q=${search}&category=${queries?.category}`;

    return router.push(url, {
      scroll: false,
    });
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <div className="flex w-full justify-center rounded-md bg-slate-100 bg-gradient-to-tl from-blue-200 to-purple-200 py-10">
        <form action={handleSearch} className="w-full max-w-xl">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-5 top-[32%] h-5 w-5 text-slate-500" />
            <Input
              id="search"
              name="search"
              type="text"
              placeholder="Search topic title"
              className="w-full border-none px-14 py-7 shadow-lg"
              defaultValue={prevSearch}
            />
            <Button
              type="submit"
              className="sr-only absolute right-5 top-[15%]"
            >
              Search
            </Button>
            {prevSearch.length > 0 && (
              <Link
                href={`/search?q=&category=${queries?.category}`}
                className="absolute right-5 top-[32%]"
              >
                <XCircle className=" h-5 w-5 text-slate-500" />
              </Link>
            )}
          </div>
        </form>
      </div>
      <div className="flex w-full gap-3 overflow-x-auto">
        {category.map((item) => (
          <Button
            onClick={() =>
              router.push(`/search?q=${prevSearch}&category=${item.value}`)
            }
            variant={"ghost"}
            className={`whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-all hover:bg-slate-100 ${
              item.value === queries?.category && "bg-blue-500 text-white"
            }`}
            key={item.id}
          >
            {item.category_name}
          </Button>
        ))}
      </div>
    </div>
  );
}
