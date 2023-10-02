import Link from "next/link";
import React from "react";

export default function InActiveUserNavbar() {
  return (
    <div className="flex gap-3">
      <Link href={`/signup`} className="flex items-center gap-2">
        Sign Up
      </Link>
      <Link href={`/signin`} className="flex items-center gap-2">
        Sign In
      </Link>
    </div>
  );
}
