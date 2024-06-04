import { useMutation, useQuery } from "@tanstack/react-query";
import { createTransfer, infoProduct } from "../api/transfer";
import { queryClient } from "../api/auth";

export function useInfoProduct(productCode) {
  return useQuery({
    queryKey: ["transfer", productCode],
    queryFn: ({ signal }) => infoProduct({ signal, productCode }),
    enabled: !!productCode,
  });
}

export function useTransferMutation() {
  return useMutation({
    mutationFn: createTransfer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transfer"] });
    },
  });
}
