"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/Types";
import { Button } from "@/components/ui/button";

export default function DirectProfileButton({
  authorData,
}: {
  authorData: User;
}) {
  if (!authorData || authorData.user_name === null) return null;

  const { user_name , avatar } = authorData;

  const handleDirectProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("clicked", user_name);
  };


 // dialog props ----> open={open} onOpenChange={setOpen}

  return (
    <Button
      variant={"link"}
      onClick={handleDirectProfile}
      className="flex items-center gap-2 p-0"
    >
      <Avatar className="h-5 w-5">
        <AvatarImage src={avatar ?? ""} className="object-cover" alt={authorData.user_name} />
        <AvatarFallback>{user_name[0]}</AvatarFallback>
      </Avatar>
      <p className="font-medium hover:underline">{user_name}</p>
    </Button>
  );
}
