import { useQuery } from "@tanstack/react-query";
import { inventoryStock, stockCard } from "../api/report";

export function useStockCard(category, productCode) {
  return useQuery({
    queryKey: ["report", category, productCode],
    queryFn: ({ signal }) => stockCard({ signal, category, productCode }),
    enabled: !!productCode,
  });
}

export function useInventoryStock(category) {
  return useQuery({
    queryKey: ["report", category],
    queryFn: ({ signal }) => inventoryStock({ signal, category }),
  });
}
