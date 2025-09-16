import { Circle } from "lucide-react";
import { getUpstreamStatus } from "./status.action";

export async function UpstreamStatus() {
  const status = await getUpstreamStatus();

  if (!status) {
    return (
      <div className="flex items-center gap-2">
        <Circle className="size-2.5 fill-red-500 text-red-500" />
        <div className="text-sm">
          <span>服務異常 😭</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Circle className="size-2.5 fill-green-500 text-green-500" />
      <div className="text-sm">
        <span>服務正常 🙌</span>
      </div>
    </div>
  );
}

export function UpstreamStatusPlaceholder() {
  return (
    <div className="flex items-center gap-2">
      <Circle className="size-2.5 fill-stone-400 text-stone-400" />
      <div className="text-sm">
        <span>服務狀態</span>
      </div>
    </div>
  );
}
