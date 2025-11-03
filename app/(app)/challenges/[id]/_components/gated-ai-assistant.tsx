"use server";

import { getAuthorizedUserInfo } from "@/lib/auth.rsc";
import { AIAssistant, type AIAssistantProps } from "./ai-assistant";

export async function GatedAIAssistant({ questionId }: AIAssistantProps) {
  const userInfo = await getAuthorizedUserInfo(["*", "ai"]);
  if (!userInfo) {
    return null;
  }

  return <AIAssistant questionId={questionId} />;
}
