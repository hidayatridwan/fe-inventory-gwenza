import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useInfoProduct, useTransferMutation } from "../hooks/transfer";
import styled from "styled-components";
import { apiUrl } from "../utils/helper";

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
  const productCodeRef = useRef();
  const formRef = useRef();
  const [productCode, setProductCode] = useState("");
  const { data, isLoading, isError, error } = useInfoProduct(productCode);
  const {
    mutate,
    isSuccess,
    isPending,
    isError: isErrorSave,
    error: errorSave,
    reset,
  } = useTransferMutation();

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
      event.preventDefault();
      setProductCode(productCodeRef.current.value);
      reset();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const jsonData = Object.fromEntries(formData);

    mutate(jsonData);
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

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <h1>Stok {type === "out" ? "Keluar" : "Masuk"}</h1>

      <input
        type="text"
        id="product_code"
        placeholder="Product Code or Scan QR Code"
        className="form-control"
        ref={productCodeRef}
        onKeyDown={handleKeyDown}
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
                  src={`${apiUrl}/products/${data?.data?.image}`}
                  alt={data?.data?.product_name}
                  className="product-img"
                />
              </div>
              <div className="product-content">
                <div className="mb-1 row">
                  <p className="col-sm-4 col-form-label">Kode Produk</p>
                  <div className="col-sm-8">
                    <p className="form-control-plaintext fw-bold">
                      {data?.data?.product_code}
                    </p>
                  </div>
                </div>
                <div className="mb-1 row">
                  <p className="col-sm-4 col-form-label">Nama Produk</p>
                  <div className="col-sm-8">
                    <p className="form-control-plaintext fw-bold">
                      {data?.data?.product_name}
                    </p>
                  </div>
                </div>
                <div className="mb-1 row">
                  <p className="col-sm-4 col-form-label">Pengrajin</p>
                  <div className="col-sm-8">
                    <p className="form-control-plaintext fw-bold">
                      {data?.data?.tailor.tailor_name}
                    </p>
                  </div>
                </div>
                <div className="mb-1 row">
                  <p className="col-sm-4 col-form-label">HPP</p>
                  <div className="col-sm-8">
                    <p className="form-control-plaintext fw-bold">
                      {data?.data?.cost_price}
                    </p>
                  </div>
                </div>
                <div className="mb-1 row">
                  <p className="col-sm-4 col-form-label">Harga Jual</p>
                  <div className="col-sm-8">
                    <p className="form-control-plaintext fw-bold">
                      {data?.data?.selling_price}
                    </p>
                  </div>
                </div>
                <div className="mb-1 row">
                  <p className="col-sm-4 col-form-label">Stok</p>
                  <div className="col-sm-8">
                    <p className="form-control-plaintext fw-bold">
                      {data?.data?.stock}
                    </p>
                  </div>
                </div>
                <div className="mb-1 row">
                  <label htmlFor="category" className="col-sm-4 col-form-label">
                    Kategori
                  </label>
                  <div className="col-sm-8">
                    <select
                      name="category"
                      id="category"
                      className="form-control"
                    >
                      <option value="Good">Good</option>
                      <option value="Bad">Bad</option>
                    </select>
                  </div>
                </div>
                <div className="mb-1 row">
                  <label htmlFor="quantity" className="col-sm-4 col-form-label">
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
                  <label htmlFor="remark" className="col-sm-4 col-form-label">
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
