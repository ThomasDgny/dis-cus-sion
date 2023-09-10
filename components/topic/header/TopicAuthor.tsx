import DisplayProfile from "@/components/common/display-profile/DisplayProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/Types";
import React from "react";

export default function TopicAuthor({ authorData }: { authorData: User }) {
  const { bio, user_name, avatar } = authorData;
  const avatarFallback = user_name ? user_name[0].toLocaleUpperCase() : null;

  return (
    <DisplayProfile authorData={authorData} triggerButtonContent={
      <div className="flex gap-3 items-center">
      <Avatar className="h-12 w-12">
        <AvatarImage src={avatar ?? ""} className="object-cover" alt="CU" />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div className="text-left">
        <h1 className="font-medium">{user_name}</h1>
        <p className="text-sm text-muted-foreground max-w-md truncate">{bio}</p>
      </div>
    </div>
    }/>
  );
}
