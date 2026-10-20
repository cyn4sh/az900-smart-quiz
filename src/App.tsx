import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { HistoryScreen } from "@/features/history/components/HistoryScreen";
import { useSaveAttempt } from "@/features/history/hooks/useSaveAttempt";
import { ProgressBar } from "@/features/quiz/components/ProgressBar";
import { QuestionCard } from "@/features/quiz/components/QuestionCard";
import { ResultsScreen } from "@/features/quiz/components/ResultsScreen";
import { StartScreen } from "@/features/quiz/components/StartScreen";
import { useQuiz } from "@/features/quiz/hooks/useQuiz";

type View = "quiz" | "history";

function App() {
  const quiz = useQuiz();
  const [view, setView] = useState<View>("quiz");
  const { mutate: saveResults, status: saveStatus } = useSaveAttempt();
  const savedRef = useRef(false);

  const { phase, index } = quiz.state;
  const { results } = quiz;
  const total = quiz.state.prepared.length;
  const isLast = index === total - 1;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [view, phase, index]);

  // Save once per finished quiz. The ref also guards against double runs.
  useEffect(() => {
    if (phase !== "results" || !results) {
      savedRef.current = false;
      return;
    }

    if (savedRef.current) {
      return;
    }

    savedRef.current = true;
    saveResults({
      score: results.score,
      total: results.total,
      topicResults: results.topicBreakdown,
    });
  }, [phase, results, saveResults]);

  if (view === "history") {
    return (
      <AppShell>
        <HistoryScreen
          onBack={() => {
            setView("quiz");
          }}
          onStartQuiz={() => {
            quiz.start();
            setView("quiz");
          }}
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      {phase === "start" ? (
        <StartScreen
          onStart={quiz.start}
          onShowHistory={() => {
            setView("history");
          }}
        />
      ) : null}

      {phase === "inProgress" && quiz.current ? (
        <div className="flex flex-col gap-4">
          <ProgressBar current={index + 1} total={total} />
          <QuestionCard
            question={quiz.current.question}
            orderedOptions={quiz.current.orderedOptions}
            selectedKey={quiz.state.selectedKey}
            revealed={quiz.state.revealed}
            isLast={isLast}
            onSelect={quiz.select}
            onNext={quiz.next}
          />
        </div>
      ) : null}

      {phase === "results" && results ? (
        <ResultsScreen
          results={results}
          saveStatus={saveStatus}
          onRetry={quiz.retry}
          onShowHistory={() => {
            setView("history");
          }}
        />
      ) : null}
    </AppShell>
  );
}

export default App;