import { useNavigate } from "react-router-dom";
import { useFetchProducts, useDeleteProduct } from "../hooks/product";
import { useRef, useState } from "react";

function Product() {
  const navigate = useNavigate();
  const searchFieldRef = useRef();
  const searchTermRef = useRef();
  const searchSizeRef = useRef();
  const [filters, setFilters] = useState({ page: 1, size: 10 });
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { data, isLoading, isError, error } = useFetchProducts(filters);
  const {
    mutate: deleteMutate,
    isLoading: isDeleting,
    isError: isDeleteError,
    error: deleteError,
  } = useDeleteProduct();

  console.log(data);

  const handleEdit = (productId) => navigate(`/products/${productId}`);

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteMutate({ productId });
    }
  };

  const handlePrint = (qrCode, productCode) => {
    const quantityPrint = window.prompt(
      "Enter the quantity you want to print."
    );
    if (quantityPrint != null) {
      window.open(`/pdf/${quantityPrint}/${qrCode}/${productCode}`, "_blank");
    }
  };

  const handleSearchTerm = () => {
    setFilters((prev) => ({
      ...prev,
      [searchFieldRef.current.value]: searchTermRef.current.value,
    }));
  };

  const handleSearchSize = () => {
    setFilters((prev) => ({
      ...prev,
      size: parseInt(searchSizeRef.current.value, 10),
    }));
  };

  const handleSearchPage = (operator) => {
    setFilters((prev) => {
      const newPage = operator === "+" ? prev.page + 1 : prev.page - 1;
      return { ...prev, page: Math.max(newPage, 1) };
    });
  };

  const toggleDropdown = (productId) => {
    setActiveDropdown((prev) => (prev === productId ? null : productId));
  };

  const renderTable = () => (
    <table className="table table-striped table-responsive">
      <thead>
        <tr>
          <th>Kode Produk</th>
          <th>Nama Produk</th>
          <th>HPP</th>
          <th>Harga Jual</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.data.map((product) => (
          <tr key={product.product_id}>
            <td>{product.product_code}</td>
            <td>{product.product_name}</td>
            <td>{product.cost_price}</td>
            <td>{product.selling_price}</td>
            <td className="text-center">
              <div className="dropdown">
                <button
                  type="button"
                  onClick={() => toggleDropdown(product.product_id)}
                  className={`btn btn-sm btn-secondary dropdown-toggle ${
                    activeDropdown === product.product_id ? "show" : ""
                  }`}
                  data-bs-toggle="dropdown"
                  aria-expanded={activeDropdown === product.product_id}
                >
                  Action
                </button>
                <ul
                  className={`dropdown-menu ${
                    activeDropdown === product.product_id ? "show" : ""
                  }`}
                >
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleEdit(product.product_id)}
                    >
                      Edit
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleDelete(product.product_id)}
                    >
                      Delete
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() =>
                        handlePrint(product.qr_code, product.product_code)
                      }
                    >
                      Print
                    </button>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderPagination = () => (
    <div className="d-flex justify-content-between align-items-start">
      <ul className="d-flex align-items-center list-unstyled gap-2">
        <li>Page</li>
        <li>
          <select
            ref={searchSizeRef}
            name="size"
            id="size"
            onChange={handleSearchSize}
            className="form-control form-control-sm"
            defaultValue="10"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </li>
      </ul>
      <ul className="d-flex align-items-center list-unstyled gap-2">
        <li>{`${Math.min(
          filters.page * filters.size - filters.size + 1,
          data.paging.total_items
        )}-${Math.min(
          filters.page * filters.size,
          data.paging.total_items
        )} of ${data.paging.total_items}`}</li>
        <li>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => handleSearchPage("-")}
            disabled={filters.page === 1}
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        <li>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => handleSearchPage("+")}
            disabled={filters.page * filters.size >= data.paging.total_items}
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </div>
  );

  return (
    <>
      <h1>Produk</h1>
      <div className="card">
        <div
          className="card-body d-flex flex-column gap-3"
          style={{ overflowX: "scroll" }}
        >
          <div className="input-group">
            <select ref={searchFieldRef} className="form-control">
              <option value="product_code">Kode Produk</option>
              <option value="product_name">Nama Produk</option>
            </select>
            <input ref={searchTermRef} type="text" className="form-control" />
          </div>
          <button className="btn btn-warning" onClick={handleSearchTerm}>
            Search
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/products/new")}
          >
            Add new
          </button>
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
          {isDeleting && (
            <div className="alert alert-warning" role="alert">
              Deleting...
            </div>
          )}
          {isDeleteError && (
            <div className="alert alert-danger" role="alert">
              {deleteError.message}
            </div>
          )}
          {data && (
            <>
              {renderTable()}
              {renderPagination()}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Product;
