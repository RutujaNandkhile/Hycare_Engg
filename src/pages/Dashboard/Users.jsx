import React, { useEffect, useState } from "react";
import { getUsers, deleteUser, updateUser } from "../../services/userService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load users");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      loadUsers();
    }
  };

  const handleUpdate = async () => {
    await updateUser(editUser.id, editUser);
    setEditUser(null);
    loadUsers();
  };

  return (
    <div className="p-4">
      <h2>Users Dashboard</h2>

      {editUser && (
        <div className="card p-3 mb-3">
          <input
            className="form-control mb-2"
            value={editUser.name}
            onChange={(e) =>
              setEditUser({ ...editUser, name: e.target.value })
            }
          />
          <input
            className="form-control mb-2"
            value={editUser.email}
            onChange={(e) =>
              setEditUser({ ...editUser, email: e.target.value })
            }
          />
          <input
            className="form-control mb-2"
            value={editUser.password}
            onChange={(e) =>
              setEditUser({ ...editUser, password: e.target.value })
            }
          />
          <button className="btn btn-success me-2" onClick={handleUpdate}>
            Update
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setEditUser(null)}
          >
            Cancel
          </button>
        </div>
      )}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.password}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => setEditUser(u)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
