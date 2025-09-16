"use server";

export async function getUpstreamStatus(): Promise<boolean> {
  try {
    const response = await fetch("https://api.dbplay.app");
    return response.ok;
  } catch (error) {
    console.error("Error getting upstream status:", error);
    return false;
  }
}
