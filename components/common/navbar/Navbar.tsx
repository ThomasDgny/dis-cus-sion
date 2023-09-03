import React, { useEffect, useState } from "react";
import Link from "next/link";
import ActiveUserNavbar from "./ActiveUserNavbar/ActiveUserNavbar";
import InActiveUserNavbar from "./InActiveUserNavbar/InActiveUserNavbar";
import Typography from "@/Typography/Typography";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.type";
import { cookies } from "next/headers";
import { User } from "@/types/Types";

export default async function Navbar() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: user } = await supabase.auth.getUser();
  const { data : sessionUser } = await supabase
  .from("users")
  .select()
  .eq("id", user.user?.id)
  .single();

  return (
    <div className="flex h-28 w-full items-center justify-between py-4">
      <div>
        <Link href={"/"} className="font-semibold">
          <Typography text="dis·cus·sion" tagName="p" variation="default" />
        </Link>
      </div>
      {sessionUser ? (
        <ActiveUserNavbar user={sessionUser as User} />
      ) : (
        <InActiveUserNavbar />
      )}
    </div>
  );
}
