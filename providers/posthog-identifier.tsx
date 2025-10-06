"use client";

import useUser from "@/hooks/use-user";
import posthog from "posthog-js";
import { useEffect } from "react";

/**
 * Identify the current user if they are logged in.
 * If they are not logged in, reset the posthog session.
 */
export default function PostHogIdentifier() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      posthog.identify(user.id, {
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  return null;
}
