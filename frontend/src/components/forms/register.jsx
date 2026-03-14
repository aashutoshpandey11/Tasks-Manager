import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate(); // for redirect

  const handleRegister = (e) => {
    e.preventDefault(); // prevent page reload

    // Get form values
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Normally, you'd send this data to your backend
    // For now, just store username in localStorage
    localStorage.setItem("user", username);

    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="vh-100 d-flex flex-column bg-light">

      {/* Header */}
      <div className="p-3">
        <h5>
          <span className="border-top border-dark me-2"></span>
          LOGO <strong className="border-bottom border-dark">COMPANY</strong>
        </h5>
      </div>

      {/* Center Card */}
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
          
          <h2 className="text-center mb-1">Sign up</h2>
          <p className="text-center text-muted mb-4">
            Create Your Account
          </p>

          {/* Updated form with onSubmit */}
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <input
                type="text"
                name="username" // added name for form access
                className="form-control border-0 border-bottom rounded-0"
                placeholder="Name"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                name="email" // added name for form access
                className="form-control border-0 border-bottom rounded-0"
                placeholder="Email"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                name="password" // added name for form access
                className="form-control border-0 border-bottom rounded-0"
                placeholder="Password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3">
              Sign up
            </button>

            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="remember"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="remember">
                Remember me
              </label>
            </div>

            <div className="text-center text-muted mb-3">
              <hr />
              <small
                className="position-relative px-2"
                style={{ top: "-22px", background: "#fff" }}
              >
                ACCESS QUICKLY
              </small>
            </div>

            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-outline-primary w-30">
                Google
              </button>
              <button type="button" className="btn btn-outline-primary w-30">
                Linkedin
              </button>
              <button type="button" className="btn btn-outline-primary w-30">
                SSO
              </button>
            </div>
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