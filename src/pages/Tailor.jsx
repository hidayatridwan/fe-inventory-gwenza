import { useNavigate } from "react-router-dom";
import { useFetchTailors, useDeleteTailor } from "../hooks/tailor";

function Tailor() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useFetchTailors();
  const {
    mutate: deleteMutate,
    isLoading: isDeleting,
    isError: isDeleteError,
    error: deleteError,
  } = useDeleteTailor();

  function handleEdit(tailorId) {
    navigate(`/tailors/${tailorId}`);
  }

  function handleDelete(tailorId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tailor?"
    );
    if (confirmDelete) {
      deleteMutate({ tailorId });
    }
  }

  return (
    <>
      <h3>Tailors</h3>
      <button onClick={() => navigate("/tailors/new")}>Add new</button>
      {isLoading && <p>Fetching...</p>}
      {isError && <p>{error.message}</p>}
      {isDeleting && <p>Deleting...</p>}
      {isDeleteError && <p>{deleteError.message}</p>}
      {data && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((tailor) => (
              <tr key={tailor.tailor_id}>
                <td>{tailor.tailor_name}</td>
                <td>{tailor.phone_number}</td>
                <td>{tailor.address}</td>
                <td>
                  <button onClick={() => handleEdit(tailor.tailor_id)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(tailor.tailor_id)}>
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

export default Tailor;
