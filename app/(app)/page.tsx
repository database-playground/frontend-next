import { ENABLE_STATISTICS_PAGE } from "@/lib/features";
import { redirect } from "next/navigation";

export default function App() {
  if (!ENABLE_STATISTICS_PAGE) {
    redirect("/challenges");
  }

  redirect("/statistics");
}
