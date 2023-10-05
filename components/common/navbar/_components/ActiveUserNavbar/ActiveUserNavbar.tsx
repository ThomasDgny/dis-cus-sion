"use client";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NewTopicButton } from "../new-topic/NewTopicButton";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";
import NavbarUserDirectButtonLoading from "../../../loading/NavbarUserDirectButtonLoading";

interface ActiveUserNavbarProps {
  currentUserID: string;
}

export default function ActiveUserNavbar({
  currentUserID,
}: ActiveUserNavbarProps) {
  const { user, getSessionUserData } = useAuth();

  useEffect(() => {
    getSessionUserData(currentUserID);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserID]);

  if (!user) return <NavbarUserDirectButtonLoading />;
  const avatarFallback = user?.user_name?.[0].toLocaleUpperCase();

  return (
    <div className="flex gap-3">
      <Link href={"/profile"} className="flex items-center gap-2">
        <h1 className="text-xl font-semibold max-w-xs break-all line-clamp-1">{user.user_name}</h1>
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={user.avatar ?? ""}
            className="object-cover"
            alt="CU"
          />
          <AvatarFallback>{avatarFallback ?? "?"}</AvatarFallback>
        </Avatar>
      </Link>
      <NewTopicButton sessionUserID={user.id} />
    </div>
  );
}
