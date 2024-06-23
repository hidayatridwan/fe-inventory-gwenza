import { useParams } from "react-router-dom";
import { useGetModel, useModelMutation } from "../hooks/model";

export default function ModelForm() {
  const { modelId } = useParams();
  const { data, isLoading } = useGetModel(modelId);

  const { mutate, isPending, isSuccess, isError, error } =
    useModelMutation(modelId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const jsonData = Object.fromEntries(formData.entries());

    if (modelId) {
      jsonData.model_id = modelId;
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
      <h1>Input Model</h1>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="d-flex flex-column">
            {isSuccess && (
              <div className="alert alert-success" role="alert">
                Successfully {modelId === undefined ? "created" : "updated"}
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
                  <label htmlFor="model_name" className="form-label">
                    Nama
                  </label>
                  <input
                    type="text"
                    id="model_name"
                    name="model_name"
                    className="form-control"
                    defaultValue={data?.data?.model_name || ""}
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
