import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  OptionButton,
  type OptionVisualState,
} from "@/features/quiz/components/OptionButton";
import { displayLetters } from "@/features/quiz/hooks/useQuiz";
import type { OptionKey, Question } from "@/features/quiz/types";

interface QuestionCardProps {
  question: Question;
  orderedOptions: Question["options"];
  selectedKey: OptionKey | null;
  revealed: boolean;
  isLast: boolean;
  onSelect: (key: OptionKey) => void;
  onNext: () => void;
}

function optionState(
  key: OptionKey,
  selectedKey: OptionKey | null,
  correctKey: OptionKey,
  revealed: boolean,
): OptionVisualState {
  if (!revealed) {
    return "idle";
  }

  if (key === correctKey) {
    return "correct";
  }

  if (key === selectedKey) {
    return "incorrect";
  }

  return "idle";
}

export function QuestionCard({
  question,
  orderedOptions,
  selectedKey,
  revealed,
  isLast,
  onSelect,
  onNext,
}: QuestionCardProps) {
  const isCorrect = selectedKey === question.correctKey;

  return (
    <Card className="rounded-[12px] border border-border bg-surface ring-0">
      <CardHeader>
        <CardTitle role="heading" aria-level={1} className="font-heading text-lg leading-snug font-semibold">
          {question.prompt}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {orderedOptions.map((option, index) => {
          const letter = displayLetters[index] ?? "";
          const visualState = optionState(
            option.key,
            selectedKey,
            question.correctKey,
            revealed,
          );

          return (
            <OptionButton
              key={option.key}
              letter={letter}
              text={option.text}
              state={visualState}
              disabled={revealed}
              whyNot={revealed ? option.whyNot : undefined}
              onClick={() => {
                onSelect(option.key);
              }}
            />
          );
        })}
      </CardContent>
      {revealed ? (
        <CardFooter className="flex flex-col items-stretch gap-4 rounded-b-[12px] border-t border-border bg-transparent">
          <div
            role="status"
            className="space-y-2 duration-200 ease-out"
          >
            <p
              className={
                isCorrect
                  ? "flex items-center gap-2 text-sm font-medium text-primary"
                  : "flex items-center gap-2 text-sm font-medium text-wrong"
              }
            >
              {isCorrect ? (
                <Check aria-hidden="true" className="size-4 stroke-[1.5]" />
              ) : (
                <X aria-hidden="true" className="size-4 stroke-[1.5]" />
              )}
              {isCorrect ? "Correct" : "Incorrect"}
            </p>
            <p className="text-sm leading-relaxed text-foreground">
              {question.explanation}
            </p>
          </div>
          <Button
            type="button"
            className="h-12 w-full rounded-[8px] text-base"
            onClick={onNext}
          >
            {isLast ? "See results" : "Next"}
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  );
}
