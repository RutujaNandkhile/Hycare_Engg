import { useEffect, useRef, useState } from "react";
import photoStore from "../../store/photostore";
import "./DashboardPhotos.css";

const categories = [
  "CNC STRENGTH",
  "VMC STRENGTH",
  "INBUILD MACHINERY",
  "JOB'S",
  "SPOT WELDING ELECTRODES",
  "SPRINGS JOB'S",
];

const DashboardPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    const unsub = photoStore.subscribe(setPhotos);
    return () => unsub();
  }, []);

  // ⭐ COMPRESS IMAGE
  const toBase64 = (file) =>
    new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => (img.src = e.target.result);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 800;
        const scale = maxWidth / img.width;

        canvas.width = maxWidth;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };

      reader.readAsDataURL(file);
    });

  const reset = () => {
    setTitle("");
    setCategory(categories[0]);
    setFile(null);
    setEditingId(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

 const submit = (e) => {
  e.preventDefault();
  if (!file && !editingId) return;

  const image = file ? URL.createObjectURL(file) : preview;

  const data = {
    title,
    category,
    image,
  };

  if (editingId) {
    photoStore.update(editingId, data);
  } else {
    photoStore.add(data);
  }

  reset();
};


  return (
    <div className="container mt-4">
      <h2>Photo Dashboard</h2>

      <form onSubmit={submit} className="mb-3">
        <input
          className="form-control mb-2"
          value={title}
          placeholder="Photo title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <select
          className="form-control mb-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <input
          type="file"
          className="form-control mb-2"
          ref={fileRef}
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files[0];
            setFile(f);
            if (f) setPreview(URL.createObjectURL(f));
          }}
        />

        <button className="btn btn-primary">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Preview</th>
            <th>Title</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {photos.map((p) => (
            <tr key={p.id}>
              <td>
                <img src={p.image} width={80} alt="" />
              </td>
              <td>{p.title}</td>
              <td>{p.category}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => {
                    setEditingId(p.id);
                    setTitle(p.title);
                    setCategory(p.category);
                    setPreview(p.image);
                  }}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => photoStore.delete(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPhotos;
