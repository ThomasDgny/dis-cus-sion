import React from "react";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NewTopicButton } from "./new-topic/NewTopicButton";
import { supabaseClient } from "@/db/supabaseClient";
import { User } from "@/types/Types";

const sessionUserID = "9ebc2c79-0249-4a9e-929b-317b66e44369";
async function ActiveUserNavbar() {
  const { data } = await supabaseClient
    .from("users")
    .select()
    .eq("id", sessionUserID)
    .single();

  const user: User = data ?? [];

  return (
    <div className="flex gap-3">
      <Link href={`/profile/${user.id}`} className="flex items-center gap-2">
        <h1 className="text-xl font-semibold">{user.user_name}</h1>
        <Avatar className="h-10 w-10">
          {/* <AvatarImage src={userAvatar} alt="CU" /> */}
          <AvatarFallback>{user.user_name[0]}</AvatarFallback>
        </Avatar>
      </Link>
      <NewTopicButton sessionUserID={sessionUserID} />
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
      {sessionUserID ? <ActiveUserNavbar /> : <InActiveUserNavbar />}
    </div>
  );
}
