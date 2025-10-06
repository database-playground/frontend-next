"use client";

import { useEffect } from "react";

import posthog from "posthog-js";

export default function PostHogResetter() {
  useEffect(() => {
    posthog.reset();
  }, []);

  return <></>;
}
