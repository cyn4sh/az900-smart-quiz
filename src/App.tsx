import { useEffect } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ProgressBar } from "@/features/quiz/components/ProgressBar";
import { QuestionCard } from "@/features/quiz/components/QuestionCard";
import { ResultsScreen } from "@/features/quiz/components/ResultsScreen";
import { StartScreen } from "@/features/quiz/components/StartScreen";
import { useQuiz } from "@/features/quiz/hooks/useQuiz";

function App() {
  const quiz = useQuiz();
  const total = quiz.state.prepared.length;
  const isLast = quiz.state.index === total - 1;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [quiz.state.phase, quiz.state.index]);

  return (
    <AppShell>
      {quiz.state.phase === "start" ? (
        <StartScreen onStart={quiz.start} />
      ) : null}

      {quiz.state.phase === "inProgress" && quiz.current ? (
        <div className="flex flex-col gap-4">
          <ProgressBar current={quiz.state.index + 1} total={total} />
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

      {quiz.state.phase === "results" && quiz.results ? (
        <ResultsScreen results={quiz.results} onRetry={quiz.retry} />
      ) : null}
    </AppShell>
  );
}

export default App;