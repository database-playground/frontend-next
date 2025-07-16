import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputTags } from "@/components/ui/input-tags";
import { Textarea } from "@/components/ui/textarea";
import { useSuspenseQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { SCOPE_SET_UPDATE_MUTATION } from "./mutation";
import { SCOPE_SET_QUERY_BY_ID } from "./query";
import { SCOPE_SET_QUERY } from "./query";

export function UpdateScopeSetDropdownTrigger({ id }: { id: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          編輯權限集
        </DropdownMenuItem>
      </DialogTrigger>
      <Suspense>
        <UpdateScopeSetDialogContent
          id={id}
          onCompleted={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </Suspense>
    </Dialog>
  );
}

export function UpdateScopeSetButtonTrigger({ id }: { id: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants()}>
        <Pencil className="h-4 w-4" />
        編輯
      </DialogTrigger>

      <Suspense>
        <UpdateScopeSetDialogContent
          id={id}
          onCompleted={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </Suspense>
    </Dialog>
  );
}

function UpdateScopeSetDialogContent({
  id,
  onCompleted,
}: {
  id: string;
  onCompleted: () => void;
}) {
  const { data } = useSuspenseQuery(SCOPE_SET_QUERY_BY_ID, {
    variables: { id },
  });


  const [updateScopeSet] = useMutation(SCOPE_SET_UPDATE_MUTATION, {
    refetchQueries: [SCOPE_SET_QUERY, SCOPE_SET_QUERY_BY_ID],

    onError(error) {
      toast.error("權限集更新失敗", {
        description: error.message,
      });
    },

    onCompleted() {
      toast.success("權限集更新成功");
      onCompleted();
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    updateScopeSet({
      variables: {
        id: id,
        input: {
          scopes: data.scopes ?? [],
          clearDescription: data.description === "",
          description: data.description || undefined,
        },
      },
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>編輯權限集</DialogTitle>
        <DialogDescription>
          編輯一個權限集，用來授予群組內的成員執行某項功能的權限。
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
          slug: data.scopeSet.slug,
          description: data.scopeSet.description ?? "",
          scopes: data.scopeSet.scopes ?? [],
        }}
        onSubmit={onSubmit}
        action="update"
      />
    </DialogContent>
  );
}

export const formSchema = z.object({
  slug: z.string().min(1),
  description: z.string().optional(),
  scopes: z.array(z.string()).optional(),
});

export interface UpdateScopeSetFormProps {
  /**
   * The default values of the form.
   */
  defaultValues?: z.infer<typeof formSchema>;

  /**
   * The function to call when the form is submitted.
   *
   * @param newValues - The new values of the form.
   */
  onSubmit: (newValues: z.infer<typeof formSchema>) => void;

  /**
   * The action to take.
   *
   * If action is "update", the slug will be disabled.
   */
  action: "update" | "create";
}

export function UpdateScopeSetForm({
  defaultValues: currentValues,
  onSubmit: onUpdated,
  action,
}: UpdateScopeSetFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: currentValues,
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    form.reset();
    onUpdated(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="slug"
          disabled={action === "update"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>權限集名稱</FormLabel>
              <FormControl>
                <Input placeholder="e.g. question-reader" {...field} />
              </FormControl>
              <FormDescription>引用權限集時，人類可讀的代號。</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>權限集描述</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g. 可以閱讀問題" {...field} />
              </FormControl>
              <FormDescription>幫助管理者理解權限集的用途。</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="scopes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>權限</FormLabel>
              <FormControl>
                <InputTags
                  value={field.value ?? []}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{action === "update" ? "編輯" : "建立"}</Button>
      </form>
    </Form>
  );
}
