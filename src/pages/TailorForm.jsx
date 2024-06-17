import { useParams } from "react-router-dom";
import { useGetTailor, useTailorMutation } from "../hooks/tailor";

export default function TailorForm() {
  const { tailorId } = useParams();
  const { data, isLoading } = useGetTailor(tailorId);

  const { mutate, isPending, isSuccess, isError, error } =
    useTailorMutation(tailorId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const jsonData = Object.fromEntries(formData.entries());

    if (tailorId) {
      jsonData.tailor_id = tailorId;
    }

    mutate(jsonData);
  };

  if (isLoading) {
    return (
      <div className="alert alert-warning" role="alert">
        Loading...
      </div>
    );
  }

  return (
    <>
      <h1>Input Pengrajin</h1>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="d-flex flex-column">
            {isSuccess && (
              <div className="alert alert-success" role="alert">
                Successfully {tailorId === undefined ? "created" : "updated"}
              </div>
            )}
            {isError && (
              <div className="alert alert-danger" role="alert">
                {error.message}
              </div>
            )}
            {isPending && (
              <div className="alert alert-warning" role="alert">
                Saving...
              </div>
            )}
            {!isSuccess && (
              <>
                <div className="mb-3">
                  <label htmlFor="tailor_name" className="form-label">
                    Tailor Name
                  </label>
                  <input
                    type="text"
                    id="tailor_name"
                    name="tailor_name"
                    className="form-control"
                    defaultValue={data?.data?.tailor_name || ""}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone_number" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone_number"
                    name="phone_number"
                    className="form-control"
                    defaultValue={data?.data?.phone_number || ""}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    className="form-control"
                    defaultValue={data?.data?.address || ""}
                    rows="3"
                  />
                </div>
                <div className="d-flex gap-2">
                  <button
                    type="reset"
                    disabled={isPending}
                    className="btn btn-light"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="btn btn-primary"
                  >
                    {isPending ? "Saving..." : "Save"}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
