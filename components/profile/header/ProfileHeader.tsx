"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import ProfileHeaderActiveUserActions from "./profile-header-activeuser/ProfileHeaderActiveUserActions";
import { useAuth } from "@/context/AuthProvider";
import ProfileHeaderLoading from "@/components/common/loading/ProfileHeaderLoading";

export default function ProfileHeader() {
  const { user } = useAuth();

  if (!user) return <ProfileHeaderLoading />;
  const avatarFallback = user.user_name?.[0].toLocaleUpperCase();

  return (
    <header className="grid h-96 grid-cols-1 overflow-hidden md:grid-cols-2">
      <div className="flex flex-col justify-center p-6 md:p-10">
        <div className="mb-4 flex space-x-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={user.avatar ?? ""} className="object-cover" alt="CU" />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-4xl font-bold max-w-xs break-all line-clamp-1">{user.user_name}</h1>
            <p className="mt-1 text-lg text-gray-600">{user.bio}</p>
            <ProfileHeaderActiveUserActions />
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <Image
          src={user.banner ?? ""}
          width={500}
          height={500}
          alt="user image"
          className="h-96 w-full rounded-lg bg-slate-200 object-cover"
        />
      </div>
    </header>
  );
}
