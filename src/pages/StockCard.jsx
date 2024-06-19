import { useState, useRef, useEffect } from "react";
import { useStockCard } from "../hooks/report";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { formattedDate, formattedNumber } from "../utils/helper";

function StockCard() {
  const categoryRef = useRef();
  const productCodeRef = useRef();
  const reportRef = useRef();
  const [category, setCategory] = useState("Good");
  const [productCode, setProductCode] = useState("");
  const [total, setTotal] = useState({
    costPrice: 0,
    sellingPrice: 0,
    margin: 0,
  });
  const { data, isLoading, isError, error } = useStockCard(
    category,
    productCode
  );

  useEffect(() => {
    if (data) {
      const { stock, info } = data.data;
      const balance = stock.reduce(
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setProductCode(productCodeRef.current.value);
    }
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
          {data.data.stock.map((stock) => {
            balance += stock.qty_in - stock.qty_out;
            return (
              <tr key={stock.transfer_id}>
                <td>{formattedDate(stock.transfer_date)}</td>
                <td>{stock.remark}</td>
                <td>{formattedNumber(stock.qty_in)}</td>
                <td>{formattedNumber(stock.qty_out)}</td>
                <td>{formattedNumber(balance)}</td>
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
        <div className="input-group">
          <select
            ref={categoryRef}
            className="form-control"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Good">Good</option>
            <option value="Bad">Bad</option>
          </select>
          <input
            ref={productCodeRef}
            type="text"
            placeholder="Product Code or Scan QR Code"
            className="form-control"
            onKeyDown={handleKeyDown}
          />
        </div>
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
                      <th>{data.data.info.product_name}</th>
                      <th>Total HPP</th>
                      <th>{formattedNumber(total.costPrice)}</th>
                    </tr>
                    <tr>
                      <th>HPP</th>
                      <th>{formattedNumber(data.data.info.cost_price)}</th>
                      <th>Total Harga Jual</th>
                      <th>{formattedNumber(total.sellingPrice)}</th>
                    </tr>
                    <tr>
                      <th>Harga Jual</th>
                      <th>{formattedNumber(data.data.info.selling_price)}</th>
                      <th>Margin</th>
                      <th>{formattedNumber(total.margin)}</th>
                    </tr>
                  </thead>
                </table>
                {renderStockTable()}
              </div>
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default StockCard;
