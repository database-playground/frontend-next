"use server";

export async function getUpstreamLatency(): Promise<number> {
  try {
    const start = Date.now();

    const response = await fetch("https://api.dbplay.app", { method: "HEAD" });
    if (!response.ok) {
      return -1;
    }
    
    return Date.now() - start;
  } catch (error) {
    console.error("Error getting upstream status:", error);
    return -1;
  }
}
