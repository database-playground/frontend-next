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
import { useMutation, useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { GROUP_CREATE_MUTATION } from "./mutation";
import { GROUP_QUERY, SCOPE_SET_LIST_QUERY } from "./query";

export function CreateGroupTrigger() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants()}>新增權限集</DialogTrigger>
      <CreateGroupDialogContent
        onCompleted={() => {
          setOpen(false);
          router.refresh();
        }}
      />
    </Dialog>
  );
}

function CreateGroupDialogContent({
  onCompleted,
}: {
  onCompleted: () => void;
}) {
  const formSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    scopeSetSlugs: z.array(z.string()).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      scopeSetSlugs: [],
    },
  });

  const { data: scopeSetList } = useQuery(SCOPE_SET_LIST_QUERY);

  const [createGroup] = useMutation(GROUP_CREATE_MUTATION, {
    refetchQueries: [GROUP_QUERY],

    onError(error) {
      toast.error("群組建立失敗", {
        description: error.message,
      });
    },

    onCompleted() {
      toast.success("群組建立成功");
      form.reset();
      onCompleted();
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    try {
      const scopeSetIDs = data.scopeSetSlugs?.map((slug) => {
        const scopeSet = scopeSetList?.scopeSets.find(
          (scopeSet) => scopeSet.slug === slug,
        );
        if (!scopeSet) {
          throw new Error(`權限集「${slug}」不存在`);
        }
        return scopeSet.id;
      });

      createGroup({
        variables: {
          input: {
            name: data.name,
            description: data.description,
            scopeSetIDs,
          },
        },
      });
    } catch (error) {
      toast.error("群組建立失敗", {
        description: error instanceof Error ? error.message : "未知錯誤",
      });
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>新增群組</DialogTitle>
        <DialogDescription>
          建立一個群組，對成員進行分組並授予相關權限。
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>群組名稱</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 甲班" {...field} />
                </FormControl>
                <FormDescription>群組名稱，用於辨識群組。</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>群組描述</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g. 114 學年度的甲班同學，具有普通使用者權限"
                    {...field}
                  />
                </FormControl>
                <FormDescription>幫助管理者理解群組的用途。</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="scopeSetSlugs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>權限集</FormLabel>
                <FormControl>
                  <InputTags
                    name="scopeSetSlugs"
                    value={field.value ?? []}
                    onChange={field.onChange}
                    list="scopeSetList"
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  輸入要套用的權限集 slug，例如 <code>admin</code>。
                </FormDescription>
              </FormItem>
            )}
          />

          {/* scope set list */}
          <datalist id="scopeSetList">
            {scopeSetList?.scopeSets.map((scopeSet) => <option key={scopeSet.id} value={scopeSet.slug} />)}
          </datalist>

          <Button type="submit">建立</Button>
        </form>
      </Form>
    </DialogContent>
  );
}
