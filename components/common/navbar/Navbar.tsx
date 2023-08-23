import React from "react";
import Link from "next/link";
import ActiveUserNavbar from "./ActiveUserNavbar/ActiveUserNavbar";
import InActiveUserNavbar from "./InActiveUserNavbar/InActiveUserNavbar";
import { supabaseClient } from "@/db/supabaseClient";
import { User } from "@/types/Types";
import Typography from "@/Typography/Typography";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.type";
import { cookies } from "next/headers";

export default async function Navbar() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const sessionUserID = session?.user.id ?? console.log("user is not active");
  
  const { data } = await supabaseClient
    .from("users")
    .select()
    .eq("id", sessionUserID)
    .single();

  const sessionUserData: User = data ?? null;

  return (
    <div className="flex h-28 w-full items-center justify-between py-4">
      <div>
        <Link href={"/"} className="font-semibold">
          <Typography text="dis·cus·sion" tagName="p" variation="default" />
        </Link>
      </div>
      {data ? (
        <ActiveUserNavbar user={sessionUserData} />
      ) : (
        <InActiveUserNavbar />
      )}
    </div>
  );
}
