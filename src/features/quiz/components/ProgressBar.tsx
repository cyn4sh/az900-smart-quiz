import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const value = total === 0 ? 0 : (current / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Question {current} of {total}</span>
        <span>{Math.round(value)}%</span>
      </div>
      <Progress
        value={value}
        aria-label={`Question ${current} of ${total}`}
        className="h-2 bg-border transition-[width] duration-200 ease-out"
      />
    </div>
  );
}
