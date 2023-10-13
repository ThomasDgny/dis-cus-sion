"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { experimental_useFormStatus } from "react-dom";

export default function UserNameInput() {
  const { pending } = experimental_useFormStatus();
  return (
    <Input
      name="username"
      placeholder="John Doe"
      type="text"
      autoCapitalize="none"
      autoComplete="username"
      autoCorrect="off"
      disabled={pending}
      required
    />
  );
}
