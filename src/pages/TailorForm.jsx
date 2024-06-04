import { useParams } from "react-router-dom";
import { useGetTailor, useTailorMutation } from "../hooks/tailor";

export default function TailorForm() {
  const { tailorId } = useParams();

  const { data, isLoading } = useGetTailor(tailorId);

  const {
    mutate,
    isLoading: isSaving,
    isError,
    error,
  } = useTailorMutation(tailorId);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const tailorData = Object.fromEntries(formData);

    if (tailorId) {
      tailorData.tailor_id = tailorId;
    }

    mutate(tailorData);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <input
        type="text"
        name="tailor_name"
        placeholder="Tailor Name"
        defaultValue={data?.data?.tailor_name || ""}
      />
      <input
        type="text"
        name="phone_number"
        placeholder="Phone Number"
        defaultValue={data?.data?.phone_number || ""}
      />
      <textarea
        name="address"
        placeholder="Address"
        defaultValue={data?.data?.address || ""}
        rows="3"
      />
      <button type="submit" disabled={isSaving}>
        {isSaving ? "Saving..." : "Save"}
      </button>
      {isError && <p>{error.message}</p>}
    </form>
  );
}
