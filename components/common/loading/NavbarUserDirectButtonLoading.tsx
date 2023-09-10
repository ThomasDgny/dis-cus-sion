import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function NavbarUserDirectButtonLoading() {
  return (
    <div className="flex items-center space-x-2">
      <div className="space-y-2">
        <Skeleton className="h-5 w-[100px]" />
      </div>
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="h-10 w-10 rounded-full" />
    </div>
  );
}
