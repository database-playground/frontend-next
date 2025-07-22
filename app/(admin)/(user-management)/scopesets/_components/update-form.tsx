import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputTags } from "@/components/ui/input-tags";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  onSubmit,
  action,
}: UpdateScopeSetFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: currentValues,
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    form.reset();
    onSubmit(data);
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
