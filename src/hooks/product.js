import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteProduct,
  fetchProducts,
  createProduct,
  getProduct,
  updateProduct,
} from "../api/product";
import { queryClient } from "../api/auth";

export function useFetchProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: ({ signal }) => fetchProducts({ signal }),
  });
}

export function useDeleteProduct() {
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useGetProduct(productId) {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: ({ signal }) => getProduct({ signal, productId }),
    enabled: !!productId,
  });
}

export function useProductMutation(productId) {
  return useMutation({
    mutationFn: productId ? updateProduct : createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
