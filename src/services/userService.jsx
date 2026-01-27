import axios from "axios";

const API_URL = "http://localhost:3001/users";

// LOGIN
export const loginUser = (email, password) => {
  return axios.get(
    `${API_URL}?email=${email}&password=${password}`
  );
};

// REGISTER
export const addUser = (user) => {
  return axios.post(API_URL, user, {
    headers: { "Content-Type": "application/json" },
  });
};

// GET USERS
export const getUsers = () => axios.get(API_URL);

// DELETE USER
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);

// UPDATE USER
export const updateUser = (id, user) =>
  axios.put(`${API_URL}/${id}`, user);
