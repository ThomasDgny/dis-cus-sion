import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/Types";
import Link from "next/link";
import React from "react";

export default function TopicAuthor({ authorData }: { authorData: User }) {
  if (!authorData) return null
  const { bio, id, user_name, avatar } = authorData;
  const avatarFallback = user_name ? user_name[0].toLocaleUpperCase() : null;


  return (
    <div className="w-full ">
      <Link
        href={`/profile/${id}`}
        className="mb-4 flex items-center space-x-4 hover:underline"
      >
        <Avatar className="h-11 w-11">
          <AvatarImage src={avatar ?? ""} className="object-cover" alt="CU" />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-medium">{user_name}</h1>
          <h1 className="text-sm text-muted-foreground">{bio}</h1>
        </div>
      </Link>
    </div>
  );
}
