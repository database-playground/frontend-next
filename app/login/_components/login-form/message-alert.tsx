"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

export function MessageAlert() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  if (!message) {
    return null;
  }

  return (
    <Alert variant="default">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        {getSuccessMessage(message)}
      </AlertDescription>
    </Alert>
  );
}

function getSuccessMessage(message: string): string {
  switch (message) {
    case "logged_out":
      return "您已成功登出。";
    default:
      return message;
  }
}
