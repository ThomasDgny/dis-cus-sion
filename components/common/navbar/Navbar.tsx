import React from "react";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const userAvatar = `https://source.unsplash.com/random/200x200?sig=1`;

  return (
    <div className="flex h-28 w-full items-center justify-between py-4">
      <div>
        <Link href={"/"}>LOGO</Link>
      </div>
      <div>
        <Link href={"profile"} className="flex items-center gap-2">
          <h1 className="font-semibold text-xl">SkyWalker</h1>
          <Avatar className="h-10 w-10">
            <AvatarImage src={userAvatar} alt="CU" />
            <AvatarFallback>{"CU"}</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </div>
  );
}
