import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/userService";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(email, password);

      if (res.data.length === 0) {
        alert("Invalid Email or Password");
        return;
      }

      localStorage.setItem("isLogin", "true");
      localStorage.setItem(
        "currentUser",
        JSON.stringify(res.data[0])
      );

      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      alert("Server not reachable");
    }
  };

  return (
    <div className="login-page container-fluid">
      <div className="login container mt-4">
        <h3>Login</h3>

        <form onSubmit={handleLogin}>
          <input
            className="form-control mb-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="form-control mb-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="mt-3">
          New user? <Link to="/Signup">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
