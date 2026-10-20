import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type OptionVisualState = "idle" | "correct" | "incorrect";

interface OptionButtonProps {
  letter: string;
  text: string;
  state: OptionVisualState;
  disabled: boolean;
  whyNot?: string;
  onClick: () => void;
}

export function OptionButton({
  letter,
  text,
  state,
  disabled,
  whyNot,
  onClick,
}: OptionButtonProps) {
  const isCorrect = state === "correct";
  const isIncorrect = state === "incorrect";

  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant="ghost"
        aria-disabled={disabled}
        onClick={disabled ? undefined : onClick}
        className={cn(
          "aria-disabled:cursor-defaulth-auto min-h-12 w-full justify-start gap-3 rounded-[8px] border border-border bg-surface px-4 py-3 text-left text-base font-normal whitespace-normal text-foreground hover:bg-surface",
          isCorrect && "border-primary text-foreground",
          isIncorrect && "border-wrong text-foreground",
        )}
      >
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-[8px] border border-border text-sm font-medium",
            isCorrect && "border-primary text-primary",
            isIncorrect && "border-wrong text-wrong",
          )}
        >
          {letter}
        </span>
        <span className="flex-1">{text}</span>
        {isCorrect ? (
          <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary">
            <Check aria-hidden="true" className="size-4 stroke-[1.5]" />
            Correct
          </span>
        ) : null}
        {isIncorrect ? (
          <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-wrong">
            <X aria-hidden="true" className="size-4 stroke-[1.5]" />
            Incorrect
          </span>
        ) : null}
      </Button>
      {whyNot ? (
        <p className="px-1 text-sm text-muted-foreground">{whyNot}</p>
      ) : null}
    </div>
  );
}
