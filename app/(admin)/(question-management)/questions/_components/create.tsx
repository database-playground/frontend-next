"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { QUESTION_CREATE_MUTATION } from "./mutation";
import { DATABASE_LIST_QUERY, QUESTIONS_TABLE_QUERY } from "./query";
import { UpdateQuestionForm, type UpdateQuestionFormData } from "./update-form";

export function CreateQuestionTrigger() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants()}>新增題目</DialogTrigger>
      <CreateQuestionDialogContent
        onCompleted={() => {
          setOpen(false);
          router.refresh();
        }}
      />
    </Dialog>
  );
}

function CreateQuestionDialogContent({
  onCompleted,
}: {
  onCompleted: () => void;
}) {
  const { data: databaseList } = useSuspenseQuery(DATABASE_LIST_QUERY);

  const [createQuestion] = useMutation(QUESTION_CREATE_MUTATION, {
    refetchQueries: [QUESTIONS_TABLE_QUERY],

    onError(error) {
      toast.error("題目建立失敗", {
        description: error.message,
      });
    },

    onCompleted() {
      toast.success("題目建立成功");
      onCompleted();
    },
  });

  const onSubmit = (data: UpdateQuestionFormData) => {
    try {
      if (!data.databaseID) {
        toast.error("必須選擇一個資料庫");
        return;
      }

      createQuestion({
        variables: {
          input: {
            title: data.title,
            description: data.description,
            category: data.category,
            difficulty: data.difficulty,
            referenceAnswer: data.referenceAnswer,
            databaseID: data.databaseID, // Now single ID as per new schema
          },
        },
      });
    } catch (error) {
      toast.error("題目建立失敗", {
        description: error instanceof Error ? error.message : "未知錯誤",
      });
    }
  };

  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>新增題目</DialogTitle>
        <DialogDescription>
          建立一個新的 SQL 練習題目，包含題目內容、難度和相關資料庫。
        </DialogDescription>
      </DialogHeader>
      <UpdateQuestionForm
        defaultValues={{
          title: "",
          description: "",
          category: "",
          difficulty: "unspecified",
          referenceAnswer: "",
          databaseID: undefined, // Optional for form validation
        }}
        onSubmit={onSubmit}
        action="create"
        databaseList={databaseList.databases}
      />
    </DialogContent>
  );
} 