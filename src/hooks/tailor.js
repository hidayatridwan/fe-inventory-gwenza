import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteTailor,
  fetchTailors,
  createTailor,
  getTailor,
  updateTailor,
} from "../api/tailor";
import { queryClient } from "../api/auth";

export function useFetchTailors() {
  return useQuery({
    queryKey: ["tailors"],
    queryFn: ({ signal }) => fetchTailors({ signal }),
  });
}

export function useDeleteTailor() {
  return useMutation({
    mutationFn: deleteTailor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tailors"] });
    },
  });
}

export function useGetTailor(tailorId) {
  return useQuery({
    queryKey: ["tailors", tailorId],
    queryFn: ({ signal }) => getTailor({ signal, tailorId }),
    enabled: !!tailorId,
  });
}

export function useTailorMutation(tailorId) {
  return useMutation({
    mutationFn: tailorId ? updateTailor : createTailor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tailors"] });
    },
  });
}
