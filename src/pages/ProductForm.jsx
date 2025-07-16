import { useParams } from "react-router-dom";
import { useGetProduct, useProductMutation } from "../hooks/product";
import { useFetchTailors } from "../hooks/tailor";
import { useFetchModels } from "../hooks/model";
import Select from "react-select";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { apiImage } from "../utils/helper";

export default function ProductForm() {
  const { productId } = useParams();
  const [modelRows, setModelRows] = useState([createNewModelRow()]);
  const [tailorOptions, setTailorOptions] = useState([]);
  const [selectedTailor, setSelectedTailor] = useState(null);
  const [modelOptions, setModelOptions] = useState([]);

  const { data: productData, isLoading: isLoadingProduct } =
    useGetProduct(productId);

  const {
    data: tailorsData,
    isLoading: isLoadingTailors,
    isError: isErrorTailors,
    error: errorTailors,
  } = useFetchTailors({ page: 1, size: 100 });

  useEffect(() => {
    setTailorOptions(
      tailorsData?.data.map((tailor) => ({
        value: tailor.tailor_id,
        label: tailor.tailor_name,
      }))
    );
  }, [tailorsData]);

  useEffect(() => {
    if (productData && tailorOptions) {
      const tailotrId = tailorOptions.find(
        (option) => option.value === productData?.data?.tailor_id
      );

      setSelectedTailor(tailotrId);
    }
  }, [tailorOptions, productData]);

  useEffect(() => {
    if (productData) {
      setModelRows(productData.data.models);
    }
  }, [productData]);

  const {
    data: modelsData,
    isLoading: isLoadingModels,
    isError: isErrorModels,
    error: errorModels,
  } = useFetchModels({ page: 1, size: 100 });

  useEffect(() => {
    setModelOptions(
      modelsData?.data.map((model) => ({
        value: model.model_id,
        label: model.model_name,
      }))
    );
  }, [modelsData]);

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

  function handleAddModel() {
    setModelRows([...modelRows, createNewModelRow()]);
  }

  function handleRemoveModel(id) {
    setModelRows(modelRows.filter((row) => row.id !== id));
  }

  function createNewModelRow() {
    return { model_id: Math.random() };
  }

  function handleChangeTailor(selectedOption) {
    setSelectedTailor(selectedOption);
  }

  function handleModelChange(modelId, selectedOption) {
    setModelRows(
      modelRows.map((row) =>
        row.model_id === modelId
          ? { ...row, model_id: selectedOption.value }
          : row
      )
    );
  }

  function renderTailorDropdown() {
    if (isLoadingTailors) {
      return <p>Fetching tailors...</p>;
    } else if (isErrorTailors) {
      return <p>{errorTailors.message}</p>;
    } else {
      return (
        <Select
          id="tailor_id"
          name="tailor_id"
          options={tailorOptions}
          value={selectedTailor}
          onChange={handleChangeTailor}
        />
      );
    }
  }

  function renderModelDropdown(row) {
    if (isLoadingModels) {
      return <p>Fetching models...</p>;
    } else if (isErrorModels) {
      return <p>{errorModels.message}</p>;
    } else if (modelOptions) {
      return (
        <Select
          name="model_id[]"
          options={modelOptions}
          value={modelOptions.find((option) => option.value === row.model_id)}
          onChange={(option) => handleModelChange(row.model_id, option)}
        />
      );
    }
  }

  return (
    <>
      <h1>Input Produk</h1>
      <div className="card">
        <div className="card-body" style={{ overflowX: "scroll" }}>
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
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          onClick={handleAddModel}
                        >
                          <FaPlus />
                        </button>
                      </th>
                      <th>Model</th>
                      <th>Gambar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modelRows.map((row, index) => (
                      <tr key={row.model_id}>
                        <th>
                          {index !== 0 && (
                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                              onClick={() => handleRemoveModel(row.model_id)}
                            >
                              <FaMinus />{" "}
                            </button>
                          )}
                        </th>
                        <td>{renderModelDropdown(row)}</td>
                        <td>
                          <input
                            type="file"
                            name="image[]"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <img
                            src={`${apiImage}/products/${row?.image}`}
                            alt={row?.image}
                            style={{ width: "80px" }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
