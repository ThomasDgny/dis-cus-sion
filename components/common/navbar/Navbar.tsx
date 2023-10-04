import React from "react";
import Link from "next/link";
import ActiveUserNavbar from "./_components/ActiveUserNavbar/ActiveUserNavbar";
import InActiveUserNavbar from "./_components/InActiveUserNavbar/InActiveUserNavbar";
import Typography from "@/Typography/Typography";
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
          <Typography text="dis·cus·sion" tagName="p" variation="default" />
        </Link>
      </div>
      {currentUserID ? <ActiveUserNavbar  currentUserID={currentUserID} /> : <InActiveUserNavbar />}
    </div>
  );
}
