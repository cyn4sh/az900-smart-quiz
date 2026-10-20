import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAttempts } from "@/features/history/hooks/useAttempts";
import { topicLabels } from "@/features/quiz/hooks/useQuiz";

interface HistoryScreenProps {
  onBack: () => void;
  onStartQuiz: () => void;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function HistoryScreen({ onBack, onStartQuiz }: HistoryScreenProps) {
  const { data, isPending, isError } = useAttempts();

  return (
    <div className="flex flex-col gap-4">
      <Card className="rounded-[12px] border border-border bg-surface ring-0">
        <CardHeader>
          <CardTitle role="heading" aria-level={1} className="font-heading text-2xl font-semibold">
            History
          </CardTitle>
          <CardDescription className="text-base">
            Your past attempts in this browser.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {isPending ? (
            <div role="status" className="space-y-3">
              <p className="sr-only">Loading your history</p>
              {[0, 1, 2].map((n) => (
                <div
                  key={n}
                  aria-hidden="true"
                  className="h-16 rounded-[8px] bg-border motion-safe:animate-pulse"
                />
              ))}
            </div>
          ) : null}

          {isError ? (
            <p className="text-sm text-wrong">
              Could not load your history. Check your connection and try again
              later.
            </p>
          ) : null}

          {data && data.length === 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                No attempts yet.
              </p>
              <Button
                type="button"
                className="h-12 w-full rounded-[8px] text-base"
                onClick={onStartQuiz}
              >
                Take your first quiz
              </Button>
            </div>
          ) : null}

          {data && data.length > 0 ? (
            <ul className="space-y-3">
              {data.map((attempt) => (
                <li
                  key={attempt.id}
                  className="space-y-2 rounded-[8px] border border-border p-3"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-heading text-lg font-semibold">
                      {attempt.score}/{attempt.total}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(attempt.createdAt)}
                    </span>
                  </div>
                  {attempt.topicResults.length > 0 ? (
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {attempt.topicResults.map((result) => (
                        <li
                          key={result.topic}
                          className="flex items-center justify-between"
                        >
                          <span>{topicLabels[result.topic]}</span>
                          <span>
                            {result.correct}/{result.total}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}

          <Button
            type="button"
            variant="ghost"
            className="h-12 w-full rounded-[8px] text-base"
            onClick={onBack}
          >
            Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}