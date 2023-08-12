import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EditProfile } from "../dialog/EditProfile";

export default function ProfileHeader() {
  const userAvatar = `https://source.unsplash.com/random/200x200?sig=1`;
  return (
    <header className="grid h-96 grid-cols-1 overflow-hidden md:grid-cols-2">
      <div className="flex flex-col justify-center p-6 md:p-10">
        <div className="mb-4 flex space-x-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={userAvatar} alt="CU" />
            <AvatarFallback>{"CU"}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-4xl font-bold">SkyWalker</h1>
            <p className="mt-1 text-lg text-gray-600">
              HI - I&apos;M SKY AND I WRITE ABOUT TRAVELING
            </p>
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
              <EditProfile />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <img
          src={userAvatar}
          alt="user image"
          className="h-96 w-full rounded-lg object-cover"
        />
      </div>
    </header>
  );
}
