"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/Types";
import Image from "next/image";
import ProfileHeaderActiveUserActions from "./profile-header-activeuser/ProfileHeaderActiveUserActions";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.type";

export default function ProfileHeader({
  userData,
  sessionUserID,
}: {
  userData: User;
  sessionUserID: string;
}) {
  const client = createClientComponentClient<Database>();
  const { bio, id, user_name, avatar } = userData;
  const avatarFallback = user_name?.[0].toLocaleUpperCase();
  const [user, setUser] = useState({
    avatar: avatar,
    bio: bio,
    user_name: user_name,
  });

  useEffect(() => {
    const channel = client
      .channel("table-filter-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "users",
          filter: `id=eq.${sessionUserID}`,
        },
        (payload) => {
        const data  = payload.new
          setUser({
            user_name: data.user_name ,
            bio: data.bio ,
            avatar: data.avatar,
          })
       
        })
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  }, [client, sessionUserID]);

  return (
    <header className="grid h-96 grid-cols-1 overflow-hidden md:grid-cols-2">
      <div className="flex flex-col justify-center p-6 md:p-10">
        <div className="mb-4 flex space-x-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={user.avatar ?? ""} alt="CU" />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-4xl font-bold">{user.user_name}</h1>
            <p className="mt-1 text-lg text-gray-600">{user.bio}</p>
            {id === sessionUserID && <ProfileHeaderActiveUserActions />}
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <Image
          src={""}
          alt="user image"
          className="h-96 w-full rounded-lg bg-slate-200 object-cover"
        />
      </div>
    </header>
  );
}
