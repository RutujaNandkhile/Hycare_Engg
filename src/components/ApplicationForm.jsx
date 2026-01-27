import { useState } from "react";

const ApplicationForm = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("Please fill all fields.");
      return;
    }

    const oldApplications = JSON.parse(localStorage.getItem("applications")) || [];
    localStorage.setItem("applications", JSON.stringify([...oldApplications, form]));

    console.log("Application stored:", [...oldApplications, form]); // log in console
    alert("Application submitted successfully!");
    setForm({ name: "", email: "", phone: "", address: "" });
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 col-md-6 mx-auto">
        <h3 className="text-center mb-3">Application Form</h3>
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-3" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
          <input className="form-control mb-3" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input className="form-control mb-3" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
          <input className="form-control mb-3" name="address" placeholder="Address" value={form.address} onChange={handleChange} />
          <button className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
