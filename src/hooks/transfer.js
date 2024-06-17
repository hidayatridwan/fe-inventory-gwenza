import { useMutation, useQuery } from "@tanstack/react-query";
import { createTransfer, infoProduct } from "../api/transfer";

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
  });
}
