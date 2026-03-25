import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const username = e.target.username.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    // Get existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Username must be unique
    const userExists = users.find((u) => u.username === username);
    if (userExists) {
      alert("Username already exists!");
      return;
    }

    // ✅ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format!");
      return;
    }

    // ✅ Password validation (min 6, letter, number, symbol)
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{6,}$/;

    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 6 characters and include letter, number, and symbol!"
      );
      return;
    }

    // ✅ Save user
    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");

    // ✅ Redirect to login page
    navigate("/");
  };

  return (
    <div className="vh-100 d-flex flex-column bg-light w-100">
      {/* Header */}
      <div className="p-3 w-100 bg-white shadow-sm">
        <h5 className="m-0">
          <span className="border-top border-dark me-2"></span>
          Task <strong className="border-bottom border-dark">Manager</strong>
        </h5>
      </div>

      {/* Center Section */}
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <div
          className="card p-4 shadow"
          style={{ width: "400px", borderRadius: "12px" }}
        >
          <h2 className="text-center mb-1">Sign up</h2>
          <p className="text-center text-muted mb-4">
            Create Your Account
          </p>

          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <input
                type="text"
                name="username"
                className="form-control border-0 border-bottom rounded-0"
                placeholder="Username"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                name="email"
                className="form-control border-0 border-bottom rounded-0"
                placeholder="Email"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                name="password"
                className="form-control border-0 border-bottom rounded-0"
                placeholder="Password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3">
              Sign up
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mb-3">
        <span className="text-muted">
          Already have an account?{" "}
          <Link to="/" style={{ textDecoration: "none" }}>
            Sign in
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Register;