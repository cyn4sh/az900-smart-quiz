import type { Topic } from "@/features/quiz/types";

export interface TopicResult {
  topic: Topic;
  correct: number;
  total: number;
}

export interface NewAttempt {
  score: number;
  total: number;
  topicResults: TopicResult[];
}

export interface Attempt extends NewAttempt {
  id: string;
  createdAt: string;
}