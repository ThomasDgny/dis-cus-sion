"use client";
import DisplayProfile from "@/components/common/display-profile/DisplayProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Topics, User } from "@/types/Types";
import React, { useState } from "react";

export default function TopicCardDisplayProfileButton({
  authorData,
}: {
  authorData: User;
}) {
  if (!authorData || authorData.user_name === null) return null;
  const { user_name, avatar } = authorData;
  return (
    <DisplayProfile
      authorData={authorData}
      triggerButtonContent={
        <>
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={avatar ?? ""}
              className="object-cover"
              alt={authorData.user_name}
            />
            <AvatarFallback>{user_name[0]}</AvatarFallback>
          </Avatar>
          <p className="font-medium hover:underline">{user_name}</p>
        </>
      }
    />
  );
}
