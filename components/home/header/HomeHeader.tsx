import React from "react";
import SearchForm from "../_components/SearchForm";

export default function HomeHeader() {
  return (
    <div className="mb-10 flex w-full flex-col items-center justify-center gap-5">
      <div className="w-full space-y-2 text-center">
        <h1 className="text-3xl font-semibold">Search</h1>
        <p className="text-slate-500">
          Welcome to our hub where discussions thrive.
        </p>
      </div>
      <SearchForm />
    </div>
  );
}
