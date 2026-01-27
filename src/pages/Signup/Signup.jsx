import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../services/userService"; // axios service
import "./auth.css";


const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    try {
      // Save user to db.json via JSON server
      await addUser(form);
      alert("User Registered Successfully!");
      setForm({ name: "", email: "", password: "" });
      navigate("/dashboard"); // redirect after registration
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (

    <>
    <div className="login-page ">
      <div className="card p-4 col-md-6 mx-auto mt-4">
      <h4>Signup</h4>
      <form onSubmit={handleSignup}>
        <input
          className="form-control mb-3"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary w-100">Register</button>
      </form>
    </div>
    </div>
    </>
  );
};

export default Signup;
