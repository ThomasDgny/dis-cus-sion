"use client";

import { Button } from "@/components/ui/button";
import { Disc2 } from "lucide-react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

interface SubmitButtonProps {
  buttonText: string;
}

export default function SubmitButton({ buttonText }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending && <Disc2 className="mr-2 h-4 w-4 animate-spin" />}
      {buttonText}
    </Button>
  );
}
