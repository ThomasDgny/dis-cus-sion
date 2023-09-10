import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function ProfileHeaderLoading() {
  return (
    <header className="grid h-96 grid-cols-1 overflow-hidden md:grid-cols-2">
      <div className="flex flex-col justify-center p-6 md:p-10">
        <div className="mb-4 flex space-x-4">
          <Skeleton className="h-14 w-14 rounded-full" />
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-10 w-[300px]" />
              <Skeleton className="h-5 w-[150px]" />
            </div>
            <div className="flex space-x-2">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <Skeleton className="h-96 w-full" />
      </div>
    </header>
  );
}
