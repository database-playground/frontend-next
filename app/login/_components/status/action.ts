"use server";

import buildUri from "@/lib/build-uri";
import { cacheLife } from "next/cache";

export async function getUpstreamLatency(): Promise<number> {
  "use cache";
  cacheLife("minutes");

  try {
    const start = performance.now();

    const response = await fetch(buildUri("/"));
    if (!response.ok) {
      return -1;
    }

    return Math.round(performance.now() - start);
  } catch (error) {
    console.error("Error getting upstream status:", error);
    return -1;
  }
}
