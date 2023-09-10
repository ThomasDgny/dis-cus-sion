import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function HomePageLoading() {
  const loadingCard = [1, 2, 3, 4, 5, 6];

  return (
    <div className="grid w-full grid-cols-1 items-start justify-center gap-6 rounded-lg md:grid-cols-2 xl:grid-cols-3">
      {loadingCard.map((item, id) => (
        <div key={id} className="py-3">
          <Skeleton className="h-60 w-full p-6 space-y-5">
            <div className="space-y-2">
              <Skeleton className="h-8 w-full bg-slate-400" />
              <Skeleton className="h-8 w-[50%] bg-slate-400" />
            </div>
            <div className="space-y-2">
            <Skeleton className="h-3 w-[30%] bg-slate-400" />
            </div>
            <div className="space-y-2">
            <Skeleton className="h-3 w-full bg-slate-400" />
            <Skeleton className="h-3 w-[80%] bg-slate-400" />
            </div>
            <div className="flex gap-2 items-center">
            <Skeleton className="h-7 w-7 rounded-full bg-slate-400" />
            <Skeleton className="h-3 w-[20%] bg-slate-400" />
            <Skeleton className="h-3 w-3 rounded-full bg-slate-400" />
            <Skeleton className="h-3 w-[10%] bg-slate-400" />
            </div>
          </Skeleton>
        </div>
      ))}
    </div>
  );
}
