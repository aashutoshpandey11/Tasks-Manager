import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  // ✅ Error state
  const [errors, setErrors] = useState({});

  const handleRegister = (e) => {
    e.preventDefault();

    const username = e.target.username.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    const newErrors = {};

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Username check
    if (users.find((u) => u.username === username)) {
      newErrors.username = "Username already exists";
    }

    // ✅ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // ✅ Password validation
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{6,}$/;

    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Min 6 chars, include letter, number & symbol";
    }

    // ❌ If errors exist → stop
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ✅ Save user
    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    navigate("/");
  };

  return (
    <div className="vh-100 d-flex flex-column bg-light w-100">
      {/* Header */}
      <div className="p-3 w-100 bg-white shadow-sm">
        <h5 className="m-0">
          Task <strong>Manager</strong>
        </h5>
      </div>

      {/* Form */}
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <div className="card p-4 shadow" style={{ width: "400px" }}>
          <h2 className="text-center mb-3">Sign up</h2>

          <form onSubmit={handleRegister}>
            {/* Username */}
            <div className="mb-3">
              <input
                type="text"
                name="username"
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
                placeholder="Username"
              />
              {errors.username && (
                <div className="text-danger small">
                  {errors.username}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <input
                type="text"
                name="email"
                className={`form-control ${
                  errors.email ? "is-invalid" : ""
                }`}
                placeholder="Email"
              />
              {errors.email && (
                <div className="text-danger small">
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password */}
            <div className="mb-3">
              <input
                type="password"
                name="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Password"
              />
              {errors.password && (
                <div className="text-danger small">
                  {errors.password}
                </div>
              )}
            </div>

            <button className="btn btn-primary w-100">
              Sign up
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mb-3">
        <span>
          Already have an account?{" "}
          <Link to="/">Sign in</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;