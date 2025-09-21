import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const gridProgressVariants = cva(
  "inline-grid items-center justify-center",
  {
    variants: {
      size: {
        sm: "gap-0.5",
        default: "gap-1",
        lg: "gap-1.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const gridItemVariants = cva(
  "rounded-sm transition-all duration-200 ease-in-out",
  {
    variants: {
      size: {
        sm: "h-2 w-2",
        default: "h-3 w-3",
        lg: "h-4 w-4",
      },
      variant: {
        default: "bg-muted",
        primary: "bg-muted",
        success: "bg-muted",
        warning: "bg-muted",
        destructive: "bg-muted",
      },
      filled: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // 主要填充狀態
      {
        variant: "primary",
        filled: true,
        className: "bg-primary shadow-sm",
      },
      // 成功填充狀態
      {
        variant: "success",
        filled: true,
        className: "bg-green-500 shadow-sm",
      },
      // 警告填充狀態
      {
        variant: "warning",
        filled: true,
        className: "bg-yellow-500 shadow-sm",
      },
      // 危險填充狀態
      {
        variant: "destructive",
        filled: true,
        className: "bg-red-500 shadow-sm",
      },
      // 預設填充狀態
      {
        variant: "default",
        filled: true,
        className: "bg-foreground shadow-sm",
      },
    ],
    defaultVariants: {
      size: "default",
      variant: "default",
      filled: false,
    },
  },
);

interface GridProgressProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof gridProgressVariants>,
    Pick<VariantProps<typeof gridItemVariants>, "variant">
{
  /**
   * 目前進度值，範圍 0-100
   */
  progress: number;
  /**
   * 網格列數
   * @default 2
   */
  rows?: number;
  /**
   * 網格欄數
   * @default 5
   */
  cols?: number;
  /**
   * 是否顯示進度文字
   * @default false
   */
  showProgress?: boolean;
  /**
   * 進度文字的自訂格式化函式
   */
  progressFormatter?: (progress: number, filledSteps: number, totalSteps: number) => string;
  /**
   * 是否啟用懸停效果
   * @default true
   */
  enableHover?: boolean;
}

const GridProgress = React.forwardRef<HTMLDivElement, GridProgressProps>(
  ({
    className,
    size,
    variant = "default",
    progress,
    rows = 2,
    cols = 5,
    showProgress = false,
    progressFormatter,
    enableHover = true,
    ...props
  }, ref) => {
    const totalSteps = rows * cols;

    // 確保 progress 在有效範圍內
    const clampedProgress = Math.max(0, Math.min(100, progress));

    // 計算需要填充的格子數
    const filledSteps = Math.round((clampedProgress / 100) * totalSteps);

    // 預設的進度文字格式化函式
    const defaultFormatter = (progress: number, filled: number, total: number) =>
      `${Math.round(progress)}% (${filled}/${total})`;

    const progressText = progressFormatter
      ? progressFormatter(clampedProgress, filledSteps, totalSteps)
      : defaultFormatter(clampedProgress, filledSteps, totalSteps);

    return (
      <div className="flex flex-col gap-2">
        <div
          ref={ref}
          className={cn(
            gridProgressVariants({ size, className }),
          )}
          style={{
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
          }}
          role="progressbar"
          aria-valuenow={clampedProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={progressText}
          {...props}
        >
          {Array.from({ length: totalSteps }, (_, index) => {
            const isFilled = index < filledSteps;
            const row = Math.floor(index / cols) + 1;
            const col = (index % cols) + 1;

            return (
              <div
                key={index}
                className={cn(
                  gridItemVariants({
                    size,
                    variant,
                    filled: isFilled,
                  }),
                  enableHover && "hover:scale-110 hover:shadow-md",
                )}
                title={`位置 (${row}, ${col})${isFilled ? " - 已完成" : " - 未完成"}`}
                aria-label={`Position (${row}, ${col})${isFilled ? ' - Completed' : ' - Not completed'}`}
              />
            );
          })}
        </div>

        {showProgress && (
          <div className="text-center text-sm text-muted-foreground">
            {progressText}
          </div>
        )}
      </div>
    );
  },
);

GridProgress.displayName = "GridProgress";

export { gridItemVariants, GridProgress, type GridProgressProps, gridProgressVariants };
