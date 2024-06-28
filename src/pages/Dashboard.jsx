import styled from "styled-components";
import { useDashboard } from "../hooks/report";
import { formattedNumber } from "../utils/helper";
import { useRef, useState } from "react";
import { format } from "date-fns";

const Container = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  flex-wrap: wrap;

  & .card {
    flex: 1 1 calc(33.333% - 1rem);
  }

  @media (max-width: 768px) {
    & .card {
      flex: 1 1 100%;
    }
  }
`;

function Dashboard() {
  const categoryRef = useRef();
  const datePeriodeRef = useRef();
  const [filters, setFilters] = useState({
    category: "All",
    date_periode: format(new Date(), "yyyy-MM-dd"),
  });
  const { data, isLoading, isError, error } = useDashboard(filters);

  function handleChange() {
    setFilters({
      category: categoryRef.current.value,
      date_periode: datePeriodeRef.current.value,
    });
  }

  return (
    <>
      <h1>Dashboard</h1>
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
        <Container>
          <div className="card">
            <div className="card-header">Stok Masuk</div>
            <div className="card-body">
              <h3>{formattedNumber(data.data.qty_in)}</h3>
            </div>
          </div>
          <div className="card">
            <div className="card-header">Stok Keluar</div>
            <div className="card-body">
              <h3>{formattedNumber(data.data.qty_out)}</h3>
            </div>
          </div>
          <div className="card">
            <div className="card-header">Stok Tersedia</div>
            <div className="card-body">
              <h3>{formattedNumber(data.data.qty_balance)}</h3>
            </div>
          </div>
          <div className="card">
            <div className="card-header">HPP</div>
            <div className="card-body">
              <h3>{formattedNumber(data.data.cost_price)}</h3>
            </div>
          </div>
          <div className="card">
            <div className="card-header">Harga Jual</div>
            <div className="card-body">
              <h3>{formattedNumber(data.data.selling_price)}</h3>
            </div>
          </div>
          <div className="card">
            <div className="card-header">Margin</div>
            <div className="card-body">
              <h3>{formattedNumber(data.data.balance_price)}</h3>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

export default Dashboard;
