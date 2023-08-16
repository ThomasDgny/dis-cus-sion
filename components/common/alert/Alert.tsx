import { Terminal } from "../../../node_modules/lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AlertCard {
  title: string;
  description: string;
  variant: "default" | "destructive";
}

export function AlertCard({ description, title, variant }: AlertCard) {
  return (
    <Alert variant={variant}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
