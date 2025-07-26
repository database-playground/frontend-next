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
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { DATABASE_CREATE_MUTATION } from "./mutation";
import { DATABASES_TABLE_QUERY } from "./query";
import { UpdateDatabaseForm, type UpdateDatabaseFormData } from "./update-form";

export function CreateDatabaseTrigger() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants()}>新增資料庫</DialogTrigger>
      <CreateDatabaseDialogContent
        onCompleted={() => {
          setOpen(false);
          router.refresh();
        }}
      />
    </Dialog>
  );
}

function CreateDatabaseDialogContent({
  onCompleted,
}: {
  onCompleted: () => void;
}) {
  const [createDatabase] = useMutation(DATABASE_CREATE_MUTATION, {
    refetchQueries: [DATABASES_TABLE_QUERY],

    onError(error) {
      toast.error("資料庫建立失敗", {
        description: error.message,
      });
    },

    onCompleted() {
      toast.success("資料庫建立成功");
      onCompleted();
    },
  });

  const onSubmit = (data: UpdateDatabaseFormData) => {
    try {
      createDatabase({
        variables: {
          input: {
            slug: data.slug!,
            description: data.description,
            schema: data.schema!,
            relationFigure: data.relationFigure!,
          },
        },
      });
    } catch (error) {
      toast.error("資料庫建立失敗", {
        description: error instanceof Error ? error.message : "未知錯誤",
      });
    }
  };

  return (
    <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto">
      <DialogHeader>
        <DialogTitle>新增資料庫</DialogTitle>
        <DialogDescription>
          建立一個新的 SQL 練習用資料庫，包含資料結構和關係圖。
        </DialogDescription>
      </DialogHeader>
      <UpdateDatabaseForm
        defaultValues={{
          slug: "",
          description: "",
          schema: "",
          relationFigure: "",
        }}
        onSubmit={onSubmit}
        action="create"
      />
    </DialogContent>
  );
}
