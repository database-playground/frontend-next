"use server";

import buildUri from "@/lib/build-uri";

export async function getUpstreamLatency(): Promise<number> {
  try {
    const start = Date.now();

    const response = await fetch(buildUri("/"));
    if (!response.ok) {
      return -1;
    }

    return Date.now() - start;
  } catch (error) {
    console.error("Error getting upstream status:", error);
    return -1;
  }
}
