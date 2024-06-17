import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { auth, queryClient } from "../api/auth";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ecf0f1;
`;

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
    <Container>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
            <h1>Inventory Gwenza</h1>
            <p>Silahkan login untuk melakukan manajemen stok</p>
            {isError && (
              <div className="alert alert-danger" role="alert">
                {error.message}
              </div>
            )}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                name="username"
                id="username"
                placeholder="Username"
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                placeholder="Password"
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="d-grid mt-3">
              <button className="btn btn-primary btn-lg" disabled={isPending}>
                {isPending ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default Auth;
