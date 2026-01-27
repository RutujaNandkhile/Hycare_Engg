import { useEffect, useRef, useState } from "react";
import photoStore from "../../store/photostore";

const DashboardPhotos = () => {
  const [photos, setPhotos] = useState(photoStore.photos);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    const unsub = photoStore.subscribe(setPhotos);
    return () => unsub();
  }, []);

  const toBase64 = (file) =>
    new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result);
      reader.onerror = rej;
      reader.readAsDataURL(file);
    });

  const reset = () => {
    setTitle("");
    setFile(null);
    setEditingId(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!title) return;

    let image = preview;
    if (file) image = await toBase64(file);

    if (editingId) {
      photoStore.update(editingId, { id: editingId, title, image });
    } else {
      if (!image) return alert("Select image");
      photoStore.add({ id: Date.now(), title, image });
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
          required={!editingId}
        />

        <button className="btn btn-primary">
          {editingId ? "Update" : "Add"}
        </button>

        {editingId && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={reset}
          >
            Cancel
          </button>
        )}
      </form>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Preview</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {photos.length ? (
            photos.map((p) => (
              <tr key={p.id}>
                <td>
                  <img src={p.image} style={{ width: 100 }} />
                </td>
                <td>{p.title}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => {
                      setEditingId(p.id);
                      setTitle(p.title);
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
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No photos
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPhotos;
