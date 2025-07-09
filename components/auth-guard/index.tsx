"use client";

import { useUser } from "@/providers/use-user";
import Forbidden from "./forbidden";
import { isAdmin } from "@/lib/user";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const {user, isInitialized} = useUser();

    useEffect(() => {
        if (isInitialized && !user) {
            router.push('/login');
        }
    }, [isInitialized, user, router]);

    if (!isInitialized || !user) {
        return null;
    }

    if (!isAdmin(user)) {
        return <Forbidden user={user} />
    }

    return <>{children}</>
}


