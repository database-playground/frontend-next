"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { graphql } from "@/gql";
import type { UpdateUserInput } from "@/gql/graphql";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const meUserInfoQuery = graphql(`
    query MeUserInfo {
        me {
            name
            avatar
        }
    }
`)

const meUpdateUserInfoMutation = graphql(`
    mutation MeUpdateUserInfo($input: UpdateUserInput!) {
        updateMe(input: $input) {
            id
        }
    }
`)

export default function Me() {
    const { data: { me } } = useSuspenseQuery(meUserInfoQuery)
    const [updateMe] = useMutation(meUpdateUserInfoMutation, {
        refetchQueries: [meUserInfoQuery],
        onError: (error) => {
            toast.error("更新使用者資訊失敗", {
                description: error.message,
            })
        },
        onCompleted: () => {
            toast.success("更新使用者資訊成功")
        },
    })

    const handleUpdateUserInfo = async (formData: FormData) => {
        const username = formData.get("username") as string
        const avatar = formData.get("avatar") as string

        const updateUserInput: UpdateUserInput = {
            name: username,
            avatar: avatar === '' ? undefined : avatar,
            clearAvatar: avatar === '',
        }

        await updateMe({ variables: { input: updateUserInput } })
    }

    return (
      <div className="flex flex-1 flex-col px-4 py-8 items-center">
        <div className="w-full max-w-xl">
          <h3 className="text-lg font-medium">個人資訊</h3>
          <p className="text-muted-foreground text-sm">管理您的個人資訊與頭貼。</p>
        </div>
        <Separator className="my-4 w-full max-w-xl" />
        <div className="flex flex-col items-center w-full max-w-xl">
          <Avatar className="w-20 h-20 mb-8">
            {me?.avatar && <AvatarImage src={me.avatar} />}
            <AvatarFallback>
              {me?.name ? me.name.charAt(0) : '?'}
            </AvatarFallback>
          </Avatar>
          <form className="flex flex-col space-y-8 w-full" action={handleUpdateUserInfo}>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="username">姓名</Label>
              <Input id="username" name="username" placeholder="姓名" defaultValue={me?.name} />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="avatar">頭貼連結</Label>
              <Input id="avatar" name="avatar" placeholder="頭貼連結" defaultValue={me?.avatar ?? ''} />
            </div>
            <Button className="w-full md:w-auto self-end">儲存</Button>
          </form>
        </div>
      </div>
    );
  }
  