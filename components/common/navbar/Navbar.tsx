import React from "react";
import Link from "next/link";
import ActiveUserNavbar from "./_components/ActiveUserNavbar/ActiveUserNavbar";
import InActiveUserNavbar from "./_components/InActiveUserNavbar/InActiveUserNavbar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.type";
import { cookies } from "next/headers";

export default async function Navbar() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: user } = await supabase.auth.getUser();
  const currentUserID = user.user?.id;

  return (
    <div className="flex h-28 w-full items-center justify-between py-4">
      <div>
        <Link href={"/"} className="font-semibold">
          <p className="leading-7 [&:not(:first-child)]:mt-6 font-bold">dis·cus·sion</p>
        </Link>
      </div>
      {currentUserID ? <ActiveUserNavbar  currentUserID={currentUserID} /> : <InActiveUserNavbar />}
    </div>
  );
}
