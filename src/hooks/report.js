import { useQuery } from "@tanstack/react-query";
import { dashboard, inventoryStock, stockCard } from "../api/report";

export function useStockCard(productCode) {
  return useQuery({
    queryKey: ["report", productCode],
    queryFn: ({ signal }) => stockCard({ signal, productCode }),
    enabled: !!productCode,
  });
}

export function useInventoryStock(filters) {
  return useQuery({
    queryKey: ["report", { filters }],
    queryFn: ({ signal }) => inventoryStock({ signal, filters }),
  });
}

export function useDashboard(filters) {
  return useQuery({
    queryKey: ["report", { filters }],
    queryFn: ({ signal }) => dashboard({ signal, filters }),
  });
}
