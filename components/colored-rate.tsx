import { cn } from "@/lib/utils";

export interface ColoredRateProps extends React.ComponentPropsWithoutRef<"span"> {
  rate: number; // float
}

export default function ColoredRate({
  rate,
  className,
  ...props
}: ColoredRateProps) {
  const color = rate > 0.8
    ? "text-green-800"
    : rate > 0.5
    ? "text-yellow-800"
    : "text-red-800";
  const roundedRate = Math.round(rate * 100);

  return (
    <span className={cn(color, className)} {...props}>
      {roundedRate}%
    </span>
  );
}
