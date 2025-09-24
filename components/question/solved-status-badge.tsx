import type { SolvedStatus } from "@/lib/solved-status";
import { Badge } from "../ui/badge";

const solvedStatusColor: Record<SolvedStatus, string> = {
  solved: "bg-green-800",
  unsolved: "bg-yellow-800",
  "not-tried": "bg-gray-800",
};

export const solvedStatusTranslation: Record<SolvedStatus, string> = {
  solved: "✅ 已經解決",
  unsolved: "尚未解決",
  "not-tried": "還沒嘗試",
};

export default function SolvedStatusBadge({
  solvedStatus,
}: {
  solvedStatus: SolvedStatus;
}) {
  return (
    <Badge className={solvedStatusColor[solvedStatus]}>
      {solvedStatusTranslation[solvedStatus]}
    </Badge>
  );
}
