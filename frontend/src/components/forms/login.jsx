import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
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

        <form>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Username"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your Password"
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
          <a href="#" style={{ color: "#2f8f2f", textDecoration: "none" }}>
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;