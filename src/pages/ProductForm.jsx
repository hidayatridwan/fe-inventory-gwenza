import { useParams } from "react-router-dom";
import { useGetProduct, useProductMutation } from "../hooks/product";
import { useFetchTailors } from "../hooks/tailor";

export default function ProductForm() {
  const { productId } = useParams();

  const { data: productData, isLoading: isLoadingProduct } =
    useGetProduct(productId);
  const {
    data: tailorsData,
    isLoading: isLoadingTailors,
    isError: isErrorTailors,
    error: errorTailors,
  } = useFetchTailors({ page: 1, size: 100 });

  const {
    mutate,
    isLoading: isSaving,
    isSuccess,
    isError,
    error,
  } = useProductMutation(productId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (productId) {
      formData.append("product_id", productId);
    }
    mutate(formData);
  };

  if (isLoadingProduct) {
    return (
      <div className="alert alert-warning" role="alert">
        Loading...
      </div>
    );
  }

  function renderTailorDropdown() {
    if (isLoadingTailors) {
      return <p>Fetching tailors...</p>;
    } else if (isErrorTailors) {
      return <p>{errorTailors.message}</p>;
    } else {
      return (
        <select
          id="tailor_id"
          name="tailor_id"
          className="form-control"
          defaultValue={productData?.data?.tailor_id || ""}
        >
          {tailorsData?.data.map((tailor) => (
            <option key={tailor.tailor_id} value={tailor.tailor_id}>
              {tailor.tailor_name}
            </option>
          ))}
        </select>
      );
    }
  }

  return (
    <>
      <h1>Input Produk</h1>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="d-flex flex-column">
            {isSuccess && (
              <div className="alert alert-success" role="alert">
                Successfully {productId ? "updated" : "created"}
              </div>
            )}
            {isError && (
              <div className="alert alert-danger" role="alert">
                {error.message}
              </div>
            )}
            {isSaving && (
              <div className="alert alert-warning" role="alert">
                Saving...
              </div>
            )}
            {!isSuccess && (
              <>
                <div className="mb-3">
                  <label htmlFor="product_name" className="form-label">
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    id="product_name"
                    name="product_name"
                    className="form-control"
                    defaultValue={productData?.data?.product_name || ""}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="cost_price" className="form-label">
                    HPP
                  </label>
                  <input
                    type="number"
                    id="cost_price"
                    name="cost_price"
                    className="form-control"
                    defaultValue={productData?.data?.cost_price || ""}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="selling_price" className="form-label">
                    Harga Jual
                  </label>
                  <input
                    type="number"
                    id="selling_price"
                    name="selling_price"
                    className="form-control"
                    defaultValue={productData?.data?.selling_price || ""}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tailor_id" className="form-label">
                    Pengrajin
                  </label>
                  {renderTailorDropdown()}
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Gambar
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    className="form-control"
                  />
                  <input
                    type="hidden"
                    name="image_name"
                    defaultValue={productData?.data?.image || ""}
                  />
                </div>
                <div className="d-flex gap-2">
                  <button
                    type="reset"
                    disabled={isSaving}
                    className="btn btn-light"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="btn btn-primary"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
