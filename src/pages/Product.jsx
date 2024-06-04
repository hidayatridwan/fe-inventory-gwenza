import { useNavigate } from "react-router-dom";
import { useFetchProducts, useDeleteProduct } from "../hooks/product";

function Product() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useFetchProducts();
  const {
    mutate: deleteMutate,
    isLoading: isDeleting,
    isError: isDeleteError,
    error: deleteError,
  } = useDeleteProduct();

  function handleEdit(productId) {
    navigate(`/products/${productId}`);
  }

  function handleDelete(productId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      deleteMutate({ productId });
    }
  }

  return (
    <>
      <h3>Products</h3>
      <button onClick={() => navigate("/products/new")}>Add new</button>
      {isLoading && <p>Fetching...</p>}
      {isError && <p>{error.message}</p>}
      {isDeleting && <p>Deleting...</p>}
      {isDeleteError && <p>{deleteError.message}</p>}
      {data && (
        <table>
          <thead>
            <tr>
              <th>Product Code</th>
              <th>Product Name</th>
              <th>Cost Price</th>
              <th>Selling Price</th>
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
                <td>
                  <button onClick={() => handleEdit(product.product_id)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(product.product_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Product;
