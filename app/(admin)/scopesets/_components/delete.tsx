import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useSuspenseQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import { SCOPE_SET_DELETE_MUTATION } from "./mutation";
import { SCOPE_SET_QUERY_BY_ID } from "./query";
import { SCOPE_SET_QUERY } from "./query";

export function DeleteScopeSetDropdownTrigger({ id }: { id: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          variant="destructive"
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          刪除權限集
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <Suspense>
        <DeleteScopeSetAlertDialogContent
          id={id}
          onCompleted={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </Suspense>
    </AlertDialog>
  );
}

export function DeleteScopeSetButtonTrigger({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className={buttonVariants({ variant: "destructive" })}>
        <Trash className="h-4 w-4" />
        <span>刪除</span>
      </AlertDialogTrigger>

      <Suspense>
        <DeleteScopeSetAlertDialogContent
          id={id}
          onCompleted={() => {
            setOpen(false);
            router.push(".");
          }}
        />
      </Suspense>
    </AlertDialog>
  );
}

function DeleteScopeSetAlertDialogContent({
  id,
  onCompleted,
}: {
  id: string;
  onCompleted: () => void;
}) {
  const { data } = useSuspenseQuery(SCOPE_SET_QUERY_BY_ID, {
    variables: { id },
  });

  const [deleteScopeSet] = useMutation(SCOPE_SET_DELETE_MUTATION, {
    refetchQueries: [SCOPE_SET_QUERY],

    onError(error) {
      toast.error("權限集刪除失敗", {
        description: error.message,
      });
    },

    onCompleted() {
      toast.success("權限集刪除成功");
      onCompleted();
    },
  });

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          確定要刪除「{data.scopeSet.slug}」權限集嗎？
        </AlertDialogTitle>
        <AlertDialogDescription>
          刪除後將無法復原這個權限集，且日後不能建立重名的 slug。請謹慎操作。
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>取消</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => deleteScopeSet({ variables: { id } })}
        >
          刪除
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
