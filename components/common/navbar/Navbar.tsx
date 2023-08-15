import React from "react";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NewTopicButton } from "./new-topic/NewTopicButton";
import { supabase } from "@/db/supabase";
import { User } from "@/types/Types";

async function ActiveUserNavbar() {
  const { data } = await supabase
    .from("users")
    .select()
    .eq("id", "51c427ab-6728-49e9-9e04-09d8182c20f1")
    .single();

  const user: User = data ?? [];

  if (!user) return null;

  return (
    <div className="flex gap-3">
      <Link href={`/profile/${user.id}`} className="flex items-center gap-2">
        <h1 className="text-xl font-semibold">{user.user_name}</h1>
        <Avatar className="h-10 w-10">
          {/* <AvatarImage src={userAvatar} alt="CU" /> */}
          <AvatarFallback>{user.user_name[0]}</AvatarFallback>
        </Avatar>
      </Link>
      <NewTopicButton />
    </div>
  );
}

function InActiveUserNavbar() {
  return (
    <div className="flex gap-3">
      <Link href={`/signin`} className="flex items-center gap-2">
        Sign In
      </Link>
      <Link href={`/login`} className="flex items-center gap-2">
        Log In
      </Link>
    </div>
  );
}

export default function Navbar() {
  return (
    <div className="flex h-28 w-full items-center justify-between py-4">
      <div>
        <Link href={"/"} className="font-semibold">
          dis·cus·sion
        </Link>
      </div>
      {<ActiveUserNavbar /> ?? <InActiveUserNavbar />}
    </div>
  );
}
