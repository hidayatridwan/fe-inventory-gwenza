import { useParams } from "react-router-dom";
import { useGetProduct, useProductMutation } from "../hooks/product";
import { useFetchTailors } from "../hooks/tailor";

export default function ProductForm() {
  const { productId } = useParams();

  const { data, isLoading } = useGetProduct(productId);
  const {
    data: dataTailor,
    isLoading: isLoadingTailor,
    isError: isErrorTailor,
    error: errorTailor,
  } = useFetchTailors();

  const {
    mutate,
    isLoading: isSaving,
    isError,
    error,
  } = useProductMutation(productId);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (productId) {
      formData.append("product_id", productId);
    }

    mutate(formData);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <input
        type="text"
        name="product_name"
        placeholder="Product Name"
        defaultValue={data?.data?.product_name || ""}
      />
      <input
        type="number"
        name="cost_price"
        placeholder="Cost Price"
        defaultValue={data?.data?.cost_price || ""}
      />
      <input
        type="number"
        name="selling_price"
        placeholder="Selling Price"
        defaultValue={data?.data?.selling_price || ""}
      />
      {isLoadingTailor && <p>Fetching tailors...</p>}
      {isErrorTailor && <p>{errorTailor.message}</p>}
      <select name="tailor_id" defaultValue={data?.data?.tailor_id || ""}>
        {dataTailor?.data.map((tailor) => (
          <option key={tailor.tailor_id} value={tailor.tailor_id}>
            {tailor.tailor_name}
          </option>
        ))}
      </select>
      <input type="file" name="image" />
      <input
        type="hidden"
        name="image_name"
        defaultValue={data?.data?.image || ""}
      />
      <button type="submit" disabled={isSaving}>
        {isSaving ? "Saving..." : "Save"}
      </button>
      {isError && <p>{error.message}</p>}
    </form>
  );
}
