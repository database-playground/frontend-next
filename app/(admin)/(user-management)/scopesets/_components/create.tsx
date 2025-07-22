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
import { z } from "zod";
import { CREATE_SCOPE_SET_MUTATION } from "./mutation";
import { SCOPE_SET_TABLE_QUERY } from "./query";
import { formSchema, UpdateScopeSetForm } from "./update-form";

export function CreateScopeSetTrigger() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants()}>新增權限集</DialogTrigger>
      <CreateScopeSetDialogContent
        onCompleted={() => {
          setOpen(false);
          router.refresh();
        }}
      />
    </Dialog>
  );
}

function CreateScopeSetDialogContent({
  onCompleted,
}: {
  onCompleted: () => void;
}) {
  const [createScopeSet] = useMutation(CREATE_SCOPE_SET_MUTATION, {
    refetchQueries: [SCOPE_SET_TABLE_QUERY],

    onError(error) {
      toast.error("權限集建立失敗", {
        description: error.message,
      });
    },

    onCompleted() {
      toast.success("權限集建立成功");
      onCompleted();
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createScopeSet({
      variables: {
        input: data,
      },
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>新增權限集</DialogTitle>
        <DialogDescription>
          建立一個權限集，用來授予群組內的成員執行某項功能的權限。
          <br />
          完整的權限說明可以參考{" "}
          <a
            className="underline"
            href="https://github.com/database-playground/backend-v2/blob/main/docs/scope.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            權限對照表
          </a>
          。
        </DialogDescription>
      </DialogHeader>

      <UpdateScopeSetForm
        defaultValues={{
          slug: "",
          description: "",
          scopes: [],
        }}
        onSubmit={onSubmit}
        action="create"
      />
    </DialogContent>
  );
}
