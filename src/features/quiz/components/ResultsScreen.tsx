import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  topicLabels,
  type QuizResults,
} from "@/features/quiz/hooks/useQuiz";

export type SaveStatus = "idle" | "pending" | "success" | "error";

const saveMessages: Record<SaveStatus, string> = {
  idle: "",
  pending: "Saving your attempt...",
  success: "Attempt saved.",
  error: "Could not save this attempt. Your score is still shown above.",
};

interface ResultsScreenProps {
  results: QuizResults;
  saveStatus: SaveStatus;
  onRetry: () => void;
  onShowHistory: () => void;
}

function optionText(
  options: QuizResults["missed"][number]["question"]["options"],
  key: QuizResults["missed"][number]["selectedKey"],
) {
  return options.find((option) => option.key === key)?.text ?? key;
}

export function ResultsScreen({
  results,
  saveStatus,
  onRetry,
  onShowHistory,
}: ResultsScreenProps) {
  return (
    <div className="flex flex-col gap-4">
      <Card className="rounded-[12px] border border-border bg-surface ring-0">
        <CardHeader>
          <CardTitle className="font-heading text-2xl font-semibold">
            Results
          </CardTitle>
          <CardDescription className="text-base">
            You scored {results.score} out of {results.total}.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h2 className="mb-2 font-heading text-sm font-semibold tracking-wide uppercase">
              By topic
            </h2>
            <ul className="space-y-2">
              {results.topicBreakdown.map((item) => (
                <li
                  key={item.topic}
                  className="flex items-center justify-between rounded-[8px] border border-border px-3 py-2 text-sm"
                >
                  <span>{topicLabels[item.topic]}</span>
                  <span className="text-muted-foreground">
                    {item.correct}/{item.total}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <p role="status" className="min-h-5 text-sm text-muted-foreground">
            {saveMessages[saveStatus]}
          </p>
          <Button
            type="button"
            className="h-12 w-full rounded-[8px] text-base"
            onClick={onRetry}
          >
            Try again
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="h-12 w-full rounded-[8px] text-base"
            onClick={onShowHistory}
          >
            History
          </Button>
        </CardContent>
      </Card>

      <Card className="rounded-[12px] border border-border bg-surface ring-0">
        <CardHeader>
          <CardTitle className="font-heading text-lg font-semibold">
            Review missed questions
          </CardTitle>
          <CardDescription>
            {results.missed.length === 0
              ? "You did not miss any questions."
              : `${results.missed.length} to review.`}
          </CardDescription>
        </CardHeader>
        {results.missed.length > 0 ? (
          <CardContent className="space-y-4">
            {results.missed.map((item) => (
              <article
                key={item.question.id}
                className="space-y-2 rounded-[8px] border border-border p-3"
              >
                <p className="text-sm font-medium">{item.question.prompt}</p>
                <p className="text-sm text-wrong">
                  Your answer: {optionText(item.question.options, item.selectedKey)}
                </p>
                <p className="text-sm text-primary">
                  Correct: {optionText(item.question.options, item.question.correctKey)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {item.question.explanation}
                </p>
              </article>
            ))}
          </CardContent>
        ) : null}
      </Card>
    </div>
  );
}