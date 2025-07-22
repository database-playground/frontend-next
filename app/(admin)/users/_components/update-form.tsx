import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputTags } from "@/components/ui/input-tags";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
  groupSlugs: z.array(z.string()).optional(),
});

export interface UpdateUserFormData {
  groupIDs: string[];
}

export interface UpdateUserFormProps {
  defaultValues?: z.infer<typeof formSchema>;
  onSubmit: (newValues: UpdateUserFormData) => void;
  action: "update" | "create";

  groupList: { id: string; name: string }[];
}

export function UpdateUserForm({
  defaultValues,
  onSubmit,
  action,
  groupList,
}: UpdateUserFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    form.reset();

    // map scope set slugs to scope set ids
    const groupIDs = data.groupSlugs?.map((slug) => {
      const group = groupList.find((group) => group.name === slug);
      if (!group) {
        throw new Error(`群組「${slug}」不存在`);
      }
      return group.id;
    });

    onSubmit({
      groupIDs: groupIDs ?? [],
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="groupSlugs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>群組</FormLabel>
              <FormControl>
                <InputTags
                  name="groupSlugs"
                  value={field.value ?? []}
                  onChange={field.onChange}
                  list="groupList"
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                輸入要加入的群組名稱，例如 <code>甲班</code>。
              </FormDescription>
            </FormItem>
          )}
        />

        {/* scope set list */}
        <datalist id="groupList">
          {groupList.map((group) => (
            <option key={group.id} value={group.name} />
          ))}
        </datalist>

        <Button type="submit">{action === "update" ? "編輯" : "建立"}</Button>
      </form>
    </Form>
  );
} 