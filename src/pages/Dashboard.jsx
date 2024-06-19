import styled from "styled-components";
import { useDashboard } from "../hooks/report";
import { formattedNumber } from "../utils/helper";

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
  const { data, isLoading, isError, error } = useDashboard();

  return (
    <>
      <h1>Dashboard</h1>
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
              <h3>{formattedNumber(data.data.qty_margin)}</h3>
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
              <h3>{formattedNumber(data.data.price_margin)}</h3>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

export default Dashboard;
