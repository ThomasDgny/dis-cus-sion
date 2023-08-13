import React from "react";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const currentuser = {
  uuid: "u6i7d8",
  email: "user7@example.com",
  user_name: "TechGeek",
  bio: "Unraveling the mysteries of technology.",
  avatar: "https://example.com/avatars/avatar7.jpg",
};

export default function Navbar() {
  const userAvatar = `https://source.unsplash.com/random/200x200?sig=1`;

  return (
    <div className="flex h-28 w-full items-center justify-between py-4">
      <div>
        <Link href={"/"} className="font-semibold">dis·cus·sion</Link>
      </div>
      <div>
        <Link href={`/profile/${currentuser.uuid}`} className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">{currentuser.user_name}</h1>
          <Avatar className="h-10 w-10">
            <AvatarImage src={userAvatar} alt="CU" />
            <AvatarFallback>{currentuser.user_name[0]}</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </div>
  );
}
