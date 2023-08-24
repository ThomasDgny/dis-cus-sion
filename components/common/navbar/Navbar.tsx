"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ActiveUserNavbar from "./ActiveUserNavbar/ActiveUserNavbar";
import InActiveUserNavbar from "./InActiveUserNavbar/InActiveUserNavbar";
import Typography from "@/Typography/Typography";
import { useAuth } from "@/context/AuthProvider";
import { supabaseClient } from "@/db/supabaseClient";
import { User } from "@/types/Types";

export default function Navbar() {
  const { user } = useAuth();

  const sessionUserData = user;

  return (
    <div className="flex h-28 w-full items-center justify-between py-4">
      <div>
        <Link href={"/"} className="font-semibold">
          <Typography text="dis·cus·sion" tagName="p" variation="default" />
        </Link>
      </div>
      {sessionUserData ? (
        <ActiveUserNavbar user={sessionUserData} />
      ) : (
        <InActiveUserNavbar />
      )}
    </div>
  );
}
