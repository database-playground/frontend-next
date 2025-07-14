"use client";

import { useMutation, useSuspenseQuery } from "@apollo/client";
import { graphql } from "@/gql";
import { SiteHeader } from "@/components/site-header";
import { columns, type ScopeSet } from "./columns";
import { Button, buttonVariants } from "@/components/ui/button";
import { GeneralDataTable } from "@/components/data-table/general";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/data-table/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/components/ui/textarea";
import { InputTags } from "@/components/ui/input-tags";
import { toast } from "sonner";

const SCOPE_SET_QUERY = graphql(`
  query ScopesetPageQuery {
    scopeSets {
      id
      slug
      description
      scopes
    }
  }
`);

export default function ScopesetPage() {
  return (
    <>
      <SiteHeader title="權限集" />
      <main
        className={`
        flex-1 space-y-4 p-4 pt-6
        md:p-8
      `}
      >
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">權限集管理</h2>
            <p className="text-muted-foreground">管理權限集與其權限。</p>
          </div>
          <CreateScopeSetDialog />
        </div>
        <div>
          <Suspense fallback={<DataTableSkeleton />}>
            <ScopeSetDataTable />
          </Suspense>
        </div>
      </main>
    </>
  );
}

const SCOPE_SET_CREATE_MUTATION = graphql(`
  mutation CreateScopeSetMutation($input: CreateScopeSetInput!) {
    createScopeSet(input: $input) {
      id
    }
  }
`);

function CreateScopeSetDialog() {
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
    <Dialog>
      <DialogTrigger className={buttonVariants()}>
        新增權限集
      </DialogTrigger>
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
                  <FormDescription>
                    幫助管理者理解權限集的用途。
                  </FormDescription>
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

            <Button type="submit">建立權限集</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function ScopeSetDataTable() {
  const { data } = useSuspenseQuery(SCOPE_SET_QUERY);

  const scopeSetList =
    data?.scopeSets.map(
      (scopeSet) =>
        ({
          id: scopeSet.id,
          slug: scopeSet.slug,
          description: scopeSet.description ?? "",
          scopes: scopeSet.scopes ?? [],
        } satisfies ScopeSet)
    ) ?? [];

  return <GeneralDataTable columns={columns} data={scopeSetList} />;
}
