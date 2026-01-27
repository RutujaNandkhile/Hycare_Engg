import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");

    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  if (!user) return null; // prevent flash

  return (
    <div className="d-flex">
      {/* SIDEBAR */}
      <div className="bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
        
        {/* ✅ ONLY USER NAME */}
        <h4 className="text-center mb-4">
          {user.name}
        </h4>

        <button className="btn btn-dark w-100 mb-2" onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>

        <button className="btn btn-dark w-100 mb-2" onClick={() => navigate("/dashboard/users")}>
          Users
        </button>

        <button className="btn btn-dark w-100 mb-2" onClick={() => navigate("/dashboard/photos")}>
          Photos
        </button>

        <hr />

        <button className="btn btn-danger w-100" onClick={() => navigate("/logout")}>
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-grow-1 p-4 bg-light">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
