import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveAttempt } from "@/api/attempts";

export function useSaveAttempt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveAttempt,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["attempts"] }),
  });
}