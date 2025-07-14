"use client";

import AppAvatar from "@/components/avatar";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { graphql } from "@/gql";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ME_QUERY = graphql(`
  query MeUserInfo {
    me {
      id
      name
      avatar
    }
  }
`);

const ME_UPDATE_MUTATION = graphql(`
  mutation MeUpdateUserInfo($input: UpdateUserInput!) {
    updateMe(input: $input) {
      id
    }
  }
`);

const updateUserInput = z.object({
  name: z.string(),
  avatar: z.url().optional(),
});

export default function Me() {
  return (
    <>
      <SiteHeader title="個人資訊" />
      <main className="flex flex-1 flex-col items-center px-4 py-8">
        <div className="w-full max-w-xl">
          <h3 className="text-lg font-medium">個人資訊</h3>
          <p className="text-sm text-muted-foreground">
            管理您的個人資訊與頭貼。
          </p>
        </div>

        <Separator className="my-4 w-full max-w-xl" />

        <Suspense fallback={<Loader />}>
          <MeForm />
        </Suspense>
      </main>
    </>
  );
}

function MeForm() {
  const {
    data: { me },
  } = useSuspenseQuery(ME_QUERY);

  const form = useForm<z.infer<typeof updateUserInput>>({
    resolver: zodResolver(updateUserInput),
    defaultValues: {
      name: me?.name ?? "",
      avatar: me?.avatar ?? "",
    },
  });

  const avatar = form.watch("avatar");

  const [updateMe] = useMutation(ME_UPDATE_MUTATION, {
    refetchQueries: [ME_QUERY],
    onError: (error) => {
      toast.error("更新使用者資訊失敗", {
        description: error.message,
      });
    },
    onCompleted: () => {
      toast.success("更新使用者資訊成功");
    },
  });

  const handleUpdateUserInfo = async (
    values: z.infer<typeof updateUserInput>,
  ) => {
    await updateMe({ variables: { input: values } });
  };

  return (
    <>
      <div className="flex w-full max-w-xl flex-col items-center">
        <AppAvatar src={avatar} name={me?.name ?? ""} className="mb-8 h-20 w-20" />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateUserInfo)}
          className="w-xl space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>姓名</FormLabel>
                <FormControl>
                  <Input placeholder="姓名" {...field} />
                </FormControl>
                <FormDescription>公開顯示的姓名。</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>頭貼連結</FormLabel>
                <FormControl>
                  <Input placeholder="頭貼連結" {...field} />
                </FormControl>
                <FormDescription>公開顯示的頭貼連結。</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">儲存</Button>
        </form>
      </Form>
    </>
  );
}
