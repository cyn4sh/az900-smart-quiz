import { getSupabase } from "@/api/supabase";
import type {
  Attempt,
  NewAttempt,
  TopicResult,
} from "@/features/history/types";
import type { Topic } from "@/features/quiz/types";
import { ensureAnonymousSession } from "@/lib/auth/anonymous";

function isTopic(value: unknown): value is Topic {
  return (
    value === "cloud-concepts" ||
    value === "azure-architecture" ||
    value === "security-and-governance"
  );
}

function isTopicResult(value: unknown): value is TopicResult {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  if (!("topic" in value) || !("correct" in value) || !("total" in value)) {
    return false;
  }

  return (
    isTopic(value.topic) &&
    typeof value.correct === "number" &&
    typeof value.total === "number"
  );
}

// topic_breakdown is jsonb, so treat it as unknown and narrow it.
function parseTopicResults(value: unknown): TopicResult[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const items: unknown[] = value;
  return items.filter(isTopicResult);
}

export async function saveAttempt(attempt: NewAttempt): Promise<void> {
  await ensureAnonymousSession();

  const { error } = await getSupabase()
    .from("attempts")
    .insert({
      score: attempt.score,
      total: attempt.total,
      topic_breakdown: attempt.topicResults.map((result) => ({
        topic: result.topic,
        correct: result.correct,
        total: result.total,
      })),
    });

  if (error) {
    throw error;
  }
}

export async function listAttempts(): Promise<Attempt[]> {
  await ensureAnonymousSession();

  const { data, error } = await getSupabase()
    .from("attempts")
    .select("id, score, total, topic_breakdown, created_at")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    throw error;
  }

  return data.map((row) => ({
    id: row.id,
    score: row.score,
    total: row.total,
    topicResults: parseTopicResults(row.topic_breakdown),
    createdAt: row.created_at,
  }));
}