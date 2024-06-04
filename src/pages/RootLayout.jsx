import { Form, Link, Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <aside>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/tailors">Tailor</Link>
          </li>
          <li>
            <Link to="/products">Product</Link>
          </li>
          <li>
            <Link to="/transfer/in">Stock IN</Link>
          </li>
          <li>
            <Link to="/transfer/out">Stock Out</Link>
          </li>
          <li>
            <Link to="/inventory-stock">Inventory</Link>
          </li>
          <li>
            <Link to="/stock-card">Stock Card</Link>
          </li>
          <li>
            <Form method="post" action="/logout">
              <button>Logout</button>
            </Form>
          </li>
        </ul>
      </aside>
      <main style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
