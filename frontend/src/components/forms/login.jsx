import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); // for redirect

  const handleLogin = (e) => {
    e.preventDefault(); // prevent page reload

    // Get form values
    const username = e.target.username.value;
    const password = e.target.password.value;

    // Normally, you'd validate login via backend
    // For now, just store username in localStorage
    localStorage.setItem("user", username);

    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f2f2f2" }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "350px", borderRadius: "10px" }}
      >
        <h4 className="text-center mb-2" style={{ color: "#2f8f2f" }}>
          Good to see you again
        </h4>

        <p className="text-center text-muted mb-4">
          Enter your login credentials
        </p>

        {/* Updated form with onSubmit */}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              type="text"
              name="username" // added name for form access
              className="form-control"
              placeholder="Enter your Username"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              name="password" // added name for form access
              className="form-control"
              placeholder="Enter your Password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100 text-white"
            style={{ backgroundColor: "#2f8f2f" }}
          >
            Submit
          </button>
        </form>

        <p className="text-center mt-3" style={{ fontSize: "0.9rem" }}>
          Not registered?{" "}
          <Link
            to="/register"
            style={{ color: "#2f8f2f", textDecoration: "none" }}
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;