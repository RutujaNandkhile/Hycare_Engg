const API_URL = "http://localhost:5000/photos";

const getAll = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

const add = async (photo) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(photo),
  });
  return res.json();
};

const update = async (id, photo) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(photo),
  });
  return res.json();
};

const remove = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

export default { getAll, add, update, remove };
