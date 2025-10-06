"use client";

import dynamic from "next/dynamic";

const DynamicPostHogIdentifier = dynamic(() => import("./posthog-identifier"), {
  ssr: false,
});

export default DynamicPostHogIdentifier;
