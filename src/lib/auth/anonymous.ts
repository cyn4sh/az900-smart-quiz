import { getSupabase } from "@/api/supabase";

async function resolveSession(): Promise<string> {
  const supabase = getSupabase();

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError) {
    throw sessionError;
  }

  const existingId = sessionData.session?.user.id;
  if (existingId) {
    return existingId;
  }

  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) {
    throw error;
  }
  if (!data.user) {
    throw new Error("Anonymous sign-in returned no user.");
  }

  return data.user.id;
}

let inFlight: Promise<string> | null = null;

// Shared in-flight promise, so two callers at once never create two users.
export function ensureAnonymousSession(): Promise<string> {
  if (!inFlight) {
    inFlight = resolveSession().finally(() => {
      inFlight = null;
    });
  }

  return inFlight;
}