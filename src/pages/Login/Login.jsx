import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/userService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(email, password);

      if (res.data.length > 0) {
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("currentUser", JSON.stringify(res.data[0]));
        alert("Login successful!");
        navigate("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Login</h3>

      <form onSubmit={handleLogin}>
        <input className="form-control mb-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="form-control mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn btn-primary w-100">Login</button>
      </form>

      <p className="mt-3">
        New user? <Link to="/Signup">Register</Link>
      </p>
    </div>
  );
};

export default Login;
