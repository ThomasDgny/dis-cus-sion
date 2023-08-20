import React from "react";
import Link from "next/link";
import ActiveUserNavbar from "./ActiveUserNavbar/ActiveUserNavbar";
import InActiveUserNavbar from "./InActiveUserNavbar/InActiveUserNavbar";
import { supabaseClient } from "@/db/supabaseClient";
import { User } from "@/types/Types";
import Typography from "@/Typography/Typography";


export default async function Navbar() {
  const sessionUserID = "982ad381-1060-498d-8782-d78b26d4f979";
  const { data } = await supabaseClient
    .from("users")
    .select()
    .eq("id", sessionUserID)
    .single();

  const user: User = data ?? null;

  return (
    <div className="flex h-28 w-full items-center justify-between py-4">
      <div>
        <Link href={"/"} className="font-semibold">
          <Typography text="dis·cus·sion" tagName="p" variation="default" />
        </Link>
      </div>
      {data ? <ActiveUserNavbar user={user} /> : <InActiveUserNavbar />}
    </div>
  );
}
