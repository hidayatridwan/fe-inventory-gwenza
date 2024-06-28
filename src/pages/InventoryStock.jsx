import { useRef, useState } from "react";
import { useInventoryStock } from "../hooks/report";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { formattedNumber } from "../utils/helper";
import { format } from "date-fns";

function InventoryStock() {
  const reportRef = useRef();
  const categoryRef = useRef();
  const datePeriodeRef = useRef();
  const [filters, setFilters] = useState({
    category: "All",
    date_periode: format(new Date(), "yyyy-MM-dd"),
  });
  const { data, isLoading, isError, error } = useInventoryStock(filters);

  function handleChange() {
    setFilters({
      category: categoryRef.current.value,
      date_periode: datePeriodeRef.current.value,
    });
  }

  return (
    <>
      <h1>Persediaan</h1>
      <div className="card">
        <div
          className="card-body d-flex flex-column gap-3"
          style={{ overflowX: "scroll" }}
        >
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

          <div className="input-group mb-3">
            <select
              name="category"
              id="category"
              ref={categoryRef}
              onChange={handleChange}
              defaultValue={filters.category}
              className="form-control"
            >
              <option value="All">All</option>
              <option value="Good">Good</option>
              <option value="Bad">Bad</option>
              <option value="Retur">Retur</option>
            </select>
            <input
              type="date"
              name="date_periode"
              id="date_periode"
              ref={datePeriodeRef}
              defaultValue={filters.date_periode}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <DownloadTableExcel
            filename="Persediaan"
            sheet="Report Persediaan"
            currentTableRef={reportRef.current}
            style={{ width: "100%" }}
          >
            <button
              type="button"
              className="btn btn-warning"
              style={{ width: "100%" }}
            >
              Download
            </button>
          </DownloadTableExcel>
          <table ref={reportRef} className="table table-striped">
            <thead>
              <tr>
                <th>Kode Produk</th>
                <th>Nama Produk</th>
                <th>Kategori</th>
                <th>Model</th>
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
                    <td>{stock.category}</td>
                    <td>{stock.model}</td>
                    <td>{formattedNumber(stock.qty_in)}</td>
                    <td>{formattedNumber(stock.qty_out)}</td>
                    <td>{formattedNumber(stock.qty_balance)}</td>
                    <td>{formattedNumber(stock.cost_price)}</td>
                    <td>{formattedNumber(stock.selling_price)}</td>
                    <td>{formattedNumber(stock.balance_price)}</td>
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
