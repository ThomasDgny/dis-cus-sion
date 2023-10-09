import React from "react";
import SearchFormV2 from "../_components/SearchFormV2";

interface queriesProps {
  query: string | null;
  category: string | null;
}

export default function SearchHeader({ category, query }: queriesProps) {
  const queries: queriesProps = {
    query: query,
    category: category,
  };

  return (
    <div className="mb-10 flex w-full flex-col items-center justify-center gap-5">
      <div className="w-full space-y-2 text-center">
        <h1 className="text-3xl font-semibold">{queries.query || queries.category || 'Discover'}</h1>
        <p className="text-slate-500">
          The best search UI work, designs, illustrations, and graphic elements.
        </p>
      </div>
      <SearchFormV2 queries={queries} />
    </div>
  );
}
