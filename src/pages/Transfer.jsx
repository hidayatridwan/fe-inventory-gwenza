import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { useInfoProduct, useTransferMutation } from "../hooks/transfer";

function Transfer() {
  const { type } = useParams();
  const productCodeRef = useRef();
  const [productCode, setProductCode] = useState("");
  const { data, isLoading, isError, error } = useInfoProduct(productCode);
  const {
    mutate,
    isLoading: isSaving,
    isError: isErrorSave,
    error: errorSave,
  } = useTransferMutation();

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
      event.preventDefault();
      setProductCode(productCodeRef.current.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const transferData = Object.fromEntries(formData);

    mutate(transferData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <h1>Stock {type.toUpperCase()}</h1>
      <input
        type="text"
        id="product_code"
        placeholder="Product Code or Scan QR Code"
        ref={productCodeRef}
        onKeyDown={handleKeyDown}
      />
      {isLoading && <p>Fetching...</p>}
      {isError && <p>{error.message}</p>}

      <p>Kode Produk: {data?.data?.product_code}</p>
      <p>Nama Produk: {data?.data?.product_name}</p>
      <p>Pengrajin: {data?.data?.tailor.tailor_name}</p>
      <p>HPP: {data?.data?.cost_price}</p>
      <p>H. Jual: {data?.data?.selling_price}</p>
      <p>Current Stock: {data?.data?.stock}</p>
      <p>
        <label htmlFor="category">Category:</label>
        <select name="category" id="category">
          <option value="Good">Good</option>
          <option value="Bad">Bad</option>
        </select>
      </p>
      <p>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          placeholder={`Quantity ${type}`}
        />
      </p>
      <p>
        <label htmlFor="remark">Keterangan:</label>
        <textarea id="remark" name="remark" rows="5" />
      </p>
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
      <button type="submit" disabled={isSaving}>
        {isSaving ? "Saving..." : "Save"}
      </button>
      {isErrorSave && <p>{errorSave.message}</p>}
    </form>
  );
}

export default Transfer;
