import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EditProfile } from "../dialog/EditProfile";
import { User } from "@/types/Types";

export default function ProfileHeader({
  userData,
  sessionUserID,
}: {
  userData: User;
  sessionUserID: string;
}) {
  return (
    <header className="grid h-96 grid-cols-1 overflow-hidden md:grid-cols-2">
      <div className="flex flex-col justify-center p-6 md:p-10">
        <div className="mb-4 flex space-x-4">
          <Avatar className="h-14 w-14">
            {/* <AvatarImage src={userAvatar} alt="CU" /> */}
            <AvatarFallback>{userData.user_name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-4xl font-bold">{userData.user_name}</h1>
            <p className="mt-1 text-lg text-gray-600">{userData.bio}</p>
            <div className="mt-4 space-x-3">
              <Button variant={"outline"}>
                <Link href={""}>IG </Link>
              </Button>
              <Button variant={"outline"}>
                <Link href={""}>FB </Link>
              </Button>
              <Button variant={"outline"}>
                <Link href={""}>X </Link>
              </Button>

              {userData.id === sessionUserID && <EditProfile />}
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <img
          src={""}
          alt="user image"
          className="h-96 w-full rounded-lg object-cover"
        />
      </div>
    </header>
  );
}
