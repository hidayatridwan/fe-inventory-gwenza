import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteModel,
  fetchModels,
  createModel,
  getModel,
  updateModel,
} from "../api/model";
import { queryClient } from "../api/auth";

export function useFetchModels(filters) {
  return useQuery({
    queryKey: ["models", { filters }],
    queryFn: ({ signal }) => fetchModels({ signal, filters }),
  });
}

export function useDeleteModel() {
  return useMutation({
    mutationFn: deleteModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
    },
  });
}

export function useGetModel(modelId) {
  return useQuery({
    queryKey: ["models", modelId],
    queryFn: ({ signal }) => getModel({ signal, modelId }),
    enabled: !!modelId,
  });
}

export function useModelMutation(modelId) {
  return useMutation({
    mutationFn: modelId ? updateModel : createModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
    },
  });
}
