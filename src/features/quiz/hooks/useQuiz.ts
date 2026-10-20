import { useMemo, useReducer } from "react";
import { questions } from "@/features/quiz/data/questions";
import type { OptionKey, Question, Topic } from "@/features/quiz/types";

export type QuizPhase = "start" | "inProgress" | "results";

export interface PreparedQuestion {
  question: Question;
  orderedOptions: Question["options"];
}

export interface AnswerRecord {
  questionId: number;
  selectedKey: OptionKey;
}

export interface TopicBreakdown {
  topic: Topic;
  correct: number;
  total: number;
}

export interface MissedQuestion {
  question: Question;
  selectedKey: OptionKey;
}

export interface QuizResults {
  score: number;
  total: number;
  topicBreakdown: TopicBreakdown[];
  missed: MissedQuestion[];
}

export interface QuizState {
  phase: QuizPhase;
  prepared: PreparedQuestion[];
  index: number;
  selectedKey: OptionKey | null;
  revealed: boolean;
  answers: AnswerRecord[];
}

type QuizAction =
  | { type: "start" }
  | { type: "select"; key: OptionKey }
  | { type: "next" }
  | { type: "retry" };

const topicOrder: Topic[] = [
  "cloud-concepts",
  "azure-architecture",
  "security-and-governance",
];

function shuffle<T>(items: readonly T[]): T[] {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const current = copy[i];
    const swapWith = copy[j];

    if (current === undefined || swapWith === undefined) {
      continue;
    }

    copy[i] = swapWith;
    copy[j] = current;
  }

  return copy;
}

function prepareQuestions(): PreparedQuestion[] {
  return questions.map((question) => ({
    question,
    orderedOptions: shuffle(question.options),
  }));
}

function createInitialState(): QuizState {
  return {
    phase: "start",
    prepared: [],
    index: 0,
    selectedKey: null,
    revealed: false,
    answers: [],
  };
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "start":
    case "retry":
      return {
        phase: "inProgress",
        prepared: prepareQuestions(),
        index: 0,
        selectedKey: null,
        revealed: false,
        answers: [],
      };
    case "select": {
      if (state.revealed || state.phase !== "inProgress") {
        return state;
      }

      const current = state.prepared[state.index];
      if (!current) {
        return state;
      }

      return {
        ...state,
        selectedKey: action.key,
        revealed: true,
        answers: [
          ...state.answers,
          { questionId: current.question.id, selectedKey: action.key },
        ],
      };
    }
    case "next": {
      if (!state.revealed || state.phase !== "inProgress") {
        return state;
      }

      const nextIndex = state.index + 1;
      if (nextIndex >= state.prepared.length) {
        return {
          ...state,
          phase: "results",
        };
      }

      return {
        ...state,
        index: nextIndex,
        selectedKey: null,
        revealed: false,
      };
    }
  }
}

function deriveResults(state: QuizState): QuizResults {
  const answersById = new Map(
    state.answers.map((answer) => [answer.questionId, answer.selectedKey]),
  );
  const totals = new Map<Topic, TopicBreakdown>(
    topicOrder.map((topic) => [topic, { topic, correct: 0, total: 0 }]),
  );

  let score = 0;
  const missed: MissedQuestion[] = [];

  for (const prepared of state.prepared) {
    const { question } = prepared;
    const breakdown = totals.get(question.topic);
    if (breakdown) {
      breakdown.total += 1;
    }

    const selectedKey = answersById.get(question.id);
    const isCorrect = selectedKey === question.correctKey;

    if (isCorrect) {
      score += 1;
      if (breakdown) {
        breakdown.correct += 1;
      }
    } else if (selectedKey !== undefined) {
      missed.push({ question, selectedKey });
    }
  }

  return {
    score,
    total: state.prepared.length,
    topicBreakdown: topicOrder
      .map((topic) => totals.get(topic))
      .filter((item): item is TopicBreakdown => item !== undefined && item.total > 0),
    missed,
  };
}

export function useQuiz() {
  const [state, dispatch] = useReducer(quizReducer, undefined, createInitialState);
  const current = state.prepared[state.index] ?? null;
  const results = useMemo(
    () => (state.phase === "results" ? deriveResults(state) : null),
    [state],
  );

  return {
    state,
    current,
    results,
    start: () => {
      dispatch({ type: "start" });
    },
    select: (key: OptionKey) => {
      dispatch({ type: "select", key });
    },
    next: () => {
      dispatch({ type: "next" });
    },
    retry: () => {
      dispatch({ type: "retry" });
    },
  };
}

export const displayLetters = ["A", "B", "C", "D"] as const;

export const topicLabels: Record<Topic, string> = {
  "cloud-concepts": "Cloud concepts",
  "azure-architecture": "Azure architecture",
  "security-and-governance": "Security and governance",
};
