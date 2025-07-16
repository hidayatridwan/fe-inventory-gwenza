import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useInfoProduct, useTransferMutation } from "../hooks/transfer";
import styled from "styled-components";
import { apiImage, formattedNumber } from "../utils/helper";
import AsyncSelect from "react-select/async";
import { useFetchProducts } from "../hooks/product";

const Container = styled.div`
  display: flex;
  gap: 1rem;

  & .product-img {
    flex: 1;
  }

  & .product-content {
    flex: 2;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    & .product-img {
      width: 100%;
    }

    & .product-content {
      flex: 1;
    }
  }
`;

function Transfer() {
  const { type } = useParams();
  const formRef = useRef();
  const categoryOptionsRef = useRef();
  const modelOptionsRef = useRef();
  const [filters, setFilters] = useState({ page: 1, size: 10 });
  const { data: dataProduct, isLoading: isLoadingProduct } =
    useFetchProducts(filters);

  const [productCode, setProductCode] = useState("");
  const [selectModel, setSelectModel] = useState({});
  const { data, isLoading, isError, error } = useInfoProduct(productCode);
  const {
    mutate,
    isSuccess,
    isPending,
    isError: isErrorSave,
    error: errorSave,
    reset,
  } = useTransferMutation();

  function handleChangeProduct(event) {
    setProductCode(event.value);
    reset();
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const jsonData = Object.fromEntries(formData);

    mutate(jsonData);
  }

  function handleChangeModel() {
    const category = categoryOptionsRef.current.value;
    const modelId = modelOptionsRef.current.value;
    const modelData = data.data?.model.find(
      (model) => model.model_id.toString() === modelId
    );

    if (modelData) {
      const { inventory, ...newModelData } = modelData;
      const inventoryData = inventory.find(
        (stock) => stock.category === category
      );
      const stock = inventoryData ? inventoryData.quantity : 0;

      setSelectModel({
        ...newModelData,
        stock,
      });
    }
  }

  const resetStates = () => {
    setProductCode("");
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      resetStates();
    }
  }, [isSuccess]);

  useEffect(() => {
    resetStates();
  }, [type]);

  useEffect(() => {
    if (data?.data?.model?.length > 0) {
      const [firstModel] = data.data.model;
      const { inventory, ...initialModel } = firstModel;
      const category = categoryOptionsRef.current.value;
      const inventoryData = inventory.find(
        (stock) => stock.category === category
      );
      const stock = inventoryData ? inventoryData.quantity : 0;

      setSelectModel({
        ...initialModel,
        stock,
      });
    }
  }, [data]);

  const loadOptionsProduct = (inputValue, callback) => {
    setFilters((prev) => ({
      ...prev,
      product_name: inputValue,
    }));

    callback(
      dataProduct?.data.map((product) => ({
        value: product.product_code,
        label: product.product_name,
      }))
    );
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <h1>Stok {type === "out" ? "Keluar" : "Masuk"}</h1>

      <AsyncSelect
        cacheOptions={true}
        defaultOptions={true}
        isLoading={isLoadingProduct}
        loadOptions={loadOptionsProduct}
        onChange={handleChangeProduct}
        value={productCode}
        placeholder="Cari nama produk..."
      />

      {isLoading && (
        <div className="alert alert-warning" role="alert">
          Fetching...
        </div>
      )}

      {isError && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}

      {isSuccess && (
        <div className="alert alert-success" role="alert">
          Successfully stock {type === "out" ? "out" : "in"}
        </div>
      )}

      {data && (
        <div className="card">
          <div className="card-body">
            {isErrorSave && (
              <div className="alert alert-danger" role="alert">
                {errorSave.message}
              </div>
            )}
            <Container>
              <div style={{ flex: 1 }}>
                <img
                  src={`${apiImage}/products/${selectModel?.image}`}
                  alt={selectModel?.model_name}
                  className="product-img"
                />
              </div>
              <div className="product-content">
                <div className="mb-1 row">
                  <p className="col-sm-4 col-form-label fw-bold">Kode Produk</p>
                  <div className="col-sm-8">
                    <p className="form-control-plaintext">
                      {data?.data?.product_code}
                    </p>
                  </div>
                </div>
                <div className="mb-1 row">
                  <p className="col-sm-4 col-form-label fw-bold">Nama Produk</p>
                  <div className="col-sm-8">
                    <p className="form-control-plaintext">
                      {data?.data?.product_name}
                    </p>
                  </div>
                </div>
                <div className="mb-1 row">
                  <p className="col-sm-4 col-form-label fw-bold">Pengrajin</p>
                  <div className="col-sm-8">
                    <p className="form-control-plaintext">
                      {data?.data?.tailor_name}
                    </p>
                  </div>
                </div>
                <div className="mb-1 row">
                  <p className="col-sm-4 col-form-label fw-bold">HPP</p>
                  <div className="col-sm-8">
                    <p className="form-control-plaintext">
                      {formattedNumber(data?.data?.cost_price)}
                    </p>
                  </div>
                </div>
                <div className="mb-1 row">
                  <p className="col-sm-4 col-form-label fw-bold">Harga Jual</p>
                  <div className="col-sm-8">
                    <p className="form-control-plaintext">
                      {formattedNumber(data?.data?.selling_price)}
                    </p>
                  </div>
                </div>
                <div className="mb-1 row">
                  <label
                    htmlFor="category"
                    className="col-sm-4 col-form-label fw-bold"
                  >
                    Kategori
                  </label>
                  <div className="col-sm-8">
                    <select
                      name="category"
                      id="category"
                      className="form-control"
                      onChange={handleChangeModel}
                      ref={categoryOptionsRef}
                    >
                      <option value="Good">Good</option>
                      <option value="Bad">Bad</option>
                      <option value="Retur">Retur</option>
                    </select>
                  </div>
                </div>
                <div className="mb-1 row">
                  <label
                    htmlFor="model_id"
                    className="col-sm-4 col-form-label fw-bold"
                  >
                    Model
                  </label>
                  <div className="col-sm-8">
                    {data?.data?.model && (
                      <select
                        name="model_id"
                        id="model_id"
                        className="form-control"
                        onChange={handleChangeModel}
                        ref={modelOptionsRef}
                      >
                        {data?.data?.model.map((model) => (
                          <option key={model.model_id} value={model.model_id}>
                            {model.model_name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
                <div className="mb-1 row">
                  <p className="col-sm-4 col-form-label fw-bold">Stok</p>
                  <div className="col-sm-8">
                    <p className="form-control-plaintext">
                      {formattedNumber(selectModel?.stock)}
                    </p>
                  </div>
                </div>
                <div className="mb-1 row">
                  <label
                    htmlFor="quantity"
                    className="col-sm-4 col-form-label fw-bold"
                  >
                    Qty
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="mb-1 row">
                  <label
                    htmlFor="remark"
                    className="col-sm-4 col-form-label fw-bold"
                  >
                    Keterangan
                  </label>
                  <div className="col-sm-8">
                    <textarea
                      id="remark"
                      name="remark"
                      className="form-control"
                      rows="5"
                    />
                  </div>
                </div>
                <input
                  type="hidden"
                  name="product_id"
                  defaultValue={data?.data?.product_id || ""}
                />
                <input
                  type="hidden"
                  name="type"
                  defaultValue={type === "in" ? "In" : "Out"}
                />
                <div className="d-grid">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="btn btn-primary"
                  >
                    {isPending ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </Container>
          </div>
        </div>
      )}
    </form>
  );
}

export default Transfer;
