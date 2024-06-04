import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { auth, queryClient } from "../api/auth";

function Auth() {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: auth,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/dashboard");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    mutate(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" />
      <input type="password" name="password" />
      <button>{isPending ? "Logging in..." : "Login"}</button>
      {isError && <p>{error.message}</p>}
    </form>
  );
}

export default Auth;
