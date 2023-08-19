import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NewTopicButton } from "../new-topic/NewTopicButton";

import Link from "next/link";
import { User } from "@/types/Types";

export default async function ActiveUserNavbar({
  user,
}: {
  user: User;
}) {
  
  return (
    <div className="flex gap-3">
      <Link href={`/profile/${user.id}`} className="flex items-center gap-2">
        <h1 className="text-xl font-semibold">{user.user_name}</h1>
        <Avatar className="h-10 w-10">
          {/* <AvatarImage src={userAvatar} alt="CU" /> */}
          <AvatarFallback>{user.user_name[0]}</AvatarFallback>
        </Avatar>
      </Link>
      <NewTopicButton sessionUserID={user.id} />
    </div>
  );
}
