import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const username = e.target.username.value.trim();
    const password = e.target.password.value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Check user credentials
    const validUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!validUser) {
      alert("Invalid username or password!");
      return;
    }

    // ✅ Save logged in user
    localStorage.setItem("loggedInUser", username);

    alert("Login successful!");

    // ✅ Redirect to dashboard
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

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter your Username"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              name="password"
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