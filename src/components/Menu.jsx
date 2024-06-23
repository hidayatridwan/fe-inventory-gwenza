import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
  color: white;
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  background: 0 0;
  border: 0;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;

  &.active {
    background-color: #34495e;
    border-radius: 5px;
  }

  &:hover {
    color: white;
    background-color: #34495e;
    border-radius: 5px;
  }
`;

function Menu() {
  return (
    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
      <li>
        <StyledNavLink to="/dashboard">Dashboard</StyledNavLink>
      </li>
      <li>
        <p
          style={{ fontWeight: "bold", textAlign: "center", marginTop: "1rem" }}
        >
          Master Data
        </p>
        <hr />
      </li>
      <li>
        <StyledNavLink to="/tailors">Pengrajin</StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/models">Model</StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/products">Produk</StyledNavLink>
      </li>
      <li>
        <p
          style={{ fontWeight: "bold", textAlign: "center", marginTop: "1rem" }}
        >
          Transaksi
        </p>
        <hr />
      </li>
      <li>
        <StyledNavLink to="/transfer/in">Stok Masuk</StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/transfer/out">Stok Keluar</StyledNavLink>
      </li>
      <li>
        <p
          style={{ fontWeight: "bold", textAlign: "center", marginTop: "1rem" }}
        >
          Laporan
        </p>
        <hr />
      </li>
      <li>
        <StyledNavLink to="/stock-card">Kartu Stok</StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/inventory-stock">Persediaan</StyledNavLink>
      </li>
    </ul>
  );
}

export default Menu;
