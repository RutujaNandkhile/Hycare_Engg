import { useEffect, useState } from "react";

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("applications")) || [];
    setApplications(data);
  }, []);

  return (
    <div className="card p-4 col-md-10 mx-auto mt-4">
      <h4 className="mb-3">Application List</h4>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Address</th>
          </tr>
        </thead>
        <tbody>
          {applications.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No applications yet</td>
            </tr>
          ) : (
            applications.map((app, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{app.phone}</td>
                <td>{app.address}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationList;
