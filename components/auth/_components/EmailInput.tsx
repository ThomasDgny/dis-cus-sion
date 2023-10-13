"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { experimental_useFormStatus } from "react-dom";

export default function EmailInput() {
  const { pending } = experimental_useFormStatus();
  return (
    <Input
      name="email"
      placeholder="name@example.com"
      type="email"
      autoCapitalize="none"
      autoComplete="email"
      autoCorrect="off"
      disabled={pending}
      required
    />
  );
}
