"use client"
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/Types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DirectProfileButton({
  authorData,
}: {
  authorData: User;
}) {
  const userAvatar = `https://source.unsplash.com/random/200x200?sig=${authorData?.id}`;
  const route = useRouter();

  const handleDirectProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    route.push(`/profile/${authorData.id}`);
  };

  return (
    <Button
      variant={"link"}
      onClick={handleDirectProfile}
      className="flex items-center gap-2 p-0"
    >
      <Avatar className="h-5 w-5">
        <AvatarImage src={userAvatar} alt={authorData.user_name} />
        <AvatarFallback>{authorData.user_name[0]}</AvatarFallback>
      </Avatar>
      <p className="font-medium hover:underline">{authorData.user_name}</p>
    </Button>
  );
}
