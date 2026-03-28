import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const username = e.target.username.value.trim();
    const password = e.target.password.value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!validUser) {
      setError("Invalid username or password!");
      return;
    }

    // ✅ Clear error if login successful
    setError("");

    localStorage.setItem("loggedInUser", username);

    navigate("./dashboard/userdashboard");
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

        <form onSubmit={handleLogin}>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              type="text"
              name="username"
              className={`form-control ${error ? "is-invalid" : ""}`}
              placeholder="Enter your Username"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              name="password"
              className={`form-control ${error ? "is-invalid" : ""}`}
              placeholder="Enter your Password"
              required
            />

            {/* ✅ Error message under password */}
            {error && <div className="invalid-feedback">{error}</div>}
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