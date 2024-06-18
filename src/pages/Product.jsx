import { useNavigate } from "react-router-dom";
import { useFetchTailors, useDeleteTailor } from "../hooks/tailor";
import { useRef, useState } from "react";

function Product() {
  const navigate = useNavigate();
  const searchFieldRef = useRef();
  const searchTermRef = useRef();
  const searchSizeRef = useRef();
  const [filters, setFilters] = useState({ page: 1, size: 10 });
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { data, isLoading, isError, error } = useFetchTailors(filters);
  const {
    mutate: deleteMutate,
    isLoading: isDeleting,
    isError: isDeleteError,
    error: deleteError,
  } = useDeleteTailor();

  const handleEdit = (tailorId) => {
    navigate(`/tailors/${tailorId}`);
  };

  const handleDelete = (tailorId) => {
    if (window.confirm("Are you sure you want to delete this tailor?")) {
      deleteMutate({ tailorId });
    }
  };

  const handleSearchTerm = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      setFilters((prev) => ({
        ...prev,
        [searchFieldRef.current.value]: searchTermRef.current.value,
      }));
    }
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

  const toggleDropdown = (tailorId) => {
    setActiveDropdown((prev) => (prev === tailorId ? null : tailorId));
  };

  const renderTable = () => (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>No HP</th>
          <th>Alamat</th>
          <th className="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.data.map((tailor, index) => (
          <tr key={tailor.tailor_id}>
            <td>{index + 1}</td>
            <td>{tailor.tailor_name}</td>
            <td>{tailor.phone_number}</td>
            <td>{tailor.address}</td>
            <td className="text-center">
              <div className="dropdown">
                <button
                  type="button"
                  onClick={() => toggleDropdown(tailor.tailor_id)}
                  className={`btn btn-sm btn-secondary dropdown-toggle ${
                    activeDropdown === tailor.tailor_id ? "show" : ""
                  }`}
                  data-bs-toggle="dropdown"
                  aria-expanded={activeDropdown === tailor.tailor_id}
                >
                  Action
                </button>
                <ul
                  className={`dropdown-menu ${
                    activeDropdown === tailor.tailor_id ? "show" : ""
                  }`}
                >
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleEdit(tailor.tailor_id)}
                    >
                      Edit
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleDelete(tailor.tailor_id)}
                    >
                      Delete
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
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "start",
      }}
    >
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          listStyle: "none",
          gap: "0.5rem",
        }}
      >
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
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          listStyle: "none",
          gap: "0.5rem",
        }}
      >
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
      <h1>Pengrajin</h1>
      <div className="card">
        <div
          className="card-body"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            overflowX: "scroll",
          }}
        >
          <div className="input-group">
            <select ref={searchFieldRef} className="form-control">
              <option value="tailor_name">Nama</option>
            </select>
            <input
              ref={searchTermRef}
              type="text"
              className="form-control"
              onKeyDown={handleSearchTerm}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/tailors/new")}
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
