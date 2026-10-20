import { useQuery } from "@tanstack/react-query";
import { listAttempts } from "@/api/attempts";

export function useAttempts() {
  return useQuery({
    queryKey: ["attempts"],
    queryFn: listAttempts,
    retry: 1,
  });
}