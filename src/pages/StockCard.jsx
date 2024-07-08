import { useState, useRef, useEffect } from "react";
import { useStockCard } from "../hooks/report";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { formattedNumber } from "../utils/helper";
import { format } from "date-fns";
import AsyncSelect from "react-select/async";
import { useFetchProducts } from "../hooks/product";

function StockCard() {
  const reportRef = useRef();
  const [filters, setFilters] = useState({ page: 1, size: 10 });
  const { data: dataProduct, isLoading: isLoadingProduct } =
    useFetchProducts(filters);
  const [productCode, setProductCode] = useState("");
  const [total, setTotal] = useState({
    costPrice: 0,
    sellingPrice: 0,
    margin: 0,
  });
  const { data, isLoading, isError, error } = useStockCard(productCode);

  useEffect(() => {
    if (data) {
      const { transfers, info } = data.data;
      const balance = transfers.reduce(
        (acc, item) => acc + item.qty_in - item.qty_out,
        0
      );
      const totalCostPrice = balance * info.cost_price;
      const totalSellingPrice = balance * info.selling_price;
      const margin = totalSellingPrice - totalCostPrice;

      setTotal({
        costPrice: totalCostPrice,
        sellingPrice: totalSellingPrice,
        margin,
      });
    }
  }, [data]);

  function handleChangeProduct(event) {
    setProductCode(event.value);
  }

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

  const renderStockTable = () => {
    let balance = 0;

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Keterangan</th>
            <th>Qty Masuk</th>
            <th>Qty Keluar</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {data.data.transfers.map((transfer) => {
            balance += transfer.qty_in - transfer.qty_out;
            return (
              <tr key={transfer.transfer_id}>
                <td>{format(transfer.transfer_date, "yyyy-MM-dd HH:mm")}</td>
                <td>{`[${transfer.category}][${transfer.model}] ${transfer.remark}`}</td>
                <td>{formattedNumber(transfer.qty_in)}</td>
                <td>{formattedNumber(transfer.qty_out)}</td>
                <td>{formattedNumber(balance)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const renderSummaryTable = () => {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Kategori</th>
            <th>Model</th>
            <th>Qty</th>
            <th>HPP</th>
            <th>Harga Jual</th>
            <th>Margin</th>
          </tr>
        </thead>
        <tbody>
          {data.data.summary.map((sum) => {
            const hpp = sum.quantity * data.data.info.cost_price;
            const hargaJual = sum.quantity * data.data.info.selling_price;
            return (
              <tr key={`${sum.category}${sum.model}`}>
                <td>{sum.category}</td>
                <td>{sum.model}</td>
                <td>{formattedNumber(sum.quantity)}</td>
                <td>{formattedNumber(hpp)}</td>
                <td>{formattedNumber(hargaJual)}</td>
                <td>{formattedNumber(hargaJual - hpp)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <h1>Kartu Stok</h1>
      <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <AsyncSelect
          cacheOptions={true}
          defaultOptions={true}
          isLoading={isLoadingProduct}
          loadOptions={loadOptionsProduct}
          onChange={handleChangeProduct}
          value={productCode}
          placeholder="Cari nama produk..."
        />
        <DownloadTableExcel
          filename={`Kartu Stok-${productCode}`}
          sheet="Report Kartu Stok"
          currentTableRef={reportRef.current}
        >
          <button
            type="button"
            className="btn btn-warning"
            style={{ width: "100%" }}
          >
            Download
          </button>
        </DownloadTableExcel>

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
        {data && (
          <div className="card">
            <div
              ref={reportRef}
              className="card-body"
              style={{ overflowX: "scroll" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nama Produk</th>
                      <td>{data.data.info.product_name}</td>
                      <th>Total HPP</th>
                      <td>{formattedNumber(total.costPrice)}</td>
                    </tr>
                    <tr>
                      <th>HPP</th>
                      <td>{formattedNumber(data.data.info.cost_price)}</td>
                      <th>Total Harga Jual</th>
                      <td>{formattedNumber(total.sellingPrice)}</td>
                    </tr>
                    <tr>
                      <th>Harga Jual</th>
                      <td>{formattedNumber(data.data.info.selling_price)}</td>
                      <th>Margin</th>
                      <td>{formattedNumber(total.margin)}</td>
                    </tr>
                  </thead>
                </table>
                {renderStockTable()}
                {renderSummaryTable()}
              </div>
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default StockCard;
