import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputTags } from "@/components/ui/input-tags";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { SCOPE_SET_CREATE_MUTATION } from "./mutation";
import { SCOPE_SET_QUERY } from "./query";

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
  const formSchema = z.object({
    slug: z.string().min(1),
    description: z.string().optional(),
    scopes: z.array(z.string()).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: "",
      description: "",
      scopes: [],
    },
  });

  const [createScopeSet] = useMutation(SCOPE_SET_CREATE_MUTATION, {
    refetchQueries: [SCOPE_SET_QUERY],

    onError(error) {
      toast.error("權限集建立失敗", {
        description: error.message,
      });
    },

    onCompleted() {
      toast.success("權限集建立成功");
      form.reset();
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>權限集名稱</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. question-reader" {...field} />
                </FormControl>
                <FormDescription>
                  引用權限集時，人類可讀的代號。
                </FormDescription>
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

          <Button type="submit">建立</Button>
        </form>
      </Form>
    </DialogContent>
  );
}
