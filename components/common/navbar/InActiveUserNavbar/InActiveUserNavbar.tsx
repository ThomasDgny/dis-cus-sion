import Link from "next/link";
import React from "react";

export default function InActiveUserNavbar() {
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
