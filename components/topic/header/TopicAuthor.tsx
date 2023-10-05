import DisplayProfile from "@/components/common/display-profile/DisplayProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/Types";
import React from "react";

export default function TopicAuthor({ authorData }: { authorData: User }) {
  const { bio, user_name, avatar } = authorData;
  const avatarFallback = user_name ? user_name[0].toLocaleUpperCase() : null;

  return (
    <DisplayProfile
      authorData={authorData}
      triggerButtonContent={
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatar ?? ""} className="object-cover" alt="CU" />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div className="text-left">
            <h1 className="line-clamp-1 max-w-xs break-all font-medium">
              {user_name}
            </h1>
            <p className="line-clamp-1 max-w-md truncate text-sm text-muted-foreground">
              {bio}
            </p>
          </div>
        </div>
      }
    />
  );
}
