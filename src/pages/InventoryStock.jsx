import { useRef, useState } from "react";
import { useInventoryStock } from "../hooks/report";
import { DownloadTableExcel } from "react-export-table-to-excel";

function InventoryStock() {
  const reportRef = useRef();
  const categoryRef = useRef();
  const [category, setCategory] = useState("Good");
  const { data, isLoading, isError, error } = useInventoryStock(category);

  return (
    <>
      <h1>Persediaan</h1>
      <div className="card">
        <div className="card-body" style={{ overflowX: "scroll" }}>
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
          <div className="input-group">
            <select
              ref={categoryRef}
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Good">Good</option>
              <option value="Bad">Bad</option>
            </select>
            <DownloadTableExcel
              filename="Persediaan"
              sheet="Report Persediaan"
              currentTableRef={reportRef.current}
            >
              <button type="button" className="btn btn-warning">
                Download
              </button>
            </DownloadTableExcel>
          </div>
          <table ref={reportRef} className="table table-striped">
            <thead>
              <tr>
                <th>Kode Produk</th>
                <th>Nama Produk</th>
                <th>Qty Masuk</th>
                <th>Qty Keluar</th>
                <th>Saldo Akhir</th>
                <th>HPP</th>
                <th>Harga Jual</th>
                <th>Margin</th>
              </tr>
            </thead>
            {data && (
              <tbody>
                {data.data.map((stock) => (
                  <tr key={stock.product_id}>
                    <td>{stock.product_code}</td>
                    <td>{stock.product_name}</td>
                    <td>{stock.qty_in}</td>
                    <td>{stock.qty_out}</td>
                    <td>{stock.balance}</td>
                    <td>{stock.cost_price}</td>
                    <td>{stock.selling_price}</td>
                    <td>{stock.margin}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
}

export default InventoryStock;
