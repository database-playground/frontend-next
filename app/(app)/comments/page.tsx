import PageHeader from "@/components/page-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "經驗分享",
};

export default function CommentsPage() {
  return (
    <section className="space-y-6">
      <PageHeader title="經驗分享" description="分享您的學習心得和經驗。" />

      <Alert>
        <AlertCircle />
        <AlertTitle>功能正在開發</AlertTitle>
        <AlertDescription>
          目前尚未上線分享學習經驗的功能。在服務上線之前，歡迎提供您對這個功能的意見！
        </AlertDescription>
      </Alert>

      <Button variant="outline" id="comment-feedback-button">提供意見</Button>
    </section>
  );
}
