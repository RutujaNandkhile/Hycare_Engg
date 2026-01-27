import { useState, useEffect, useRef } from "react";
import photoStore from "../../store/photostore";


const DashboardPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const fileInputRef = useRef(null);

  // Load photos on mount
  useEffect(() => {
    setPhotos([...photoStore.photos]);
  }, []);

  const clearMessage = () => {
    setTimeout(() => setMessage(""), 3000);
  };

  const resetForm = () => {
    setTitle("");
    setFile(null);
    setEditingId(null);
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const addOrUpdatePhoto = async (e) => {
    e.preventDefault();
    if (!title) return;

    let imageBase64 = null;
    if (file) imageBase64 = await toBase64(file);

    if (editingId) {
      const oldPhoto = photos.find((p) => p.id === editingId);
      const updatedPhoto = { id: editingId, title, image: imageBase64 || oldPhoto.image };
      photoStore.update(editingId, updatedPhoto);
      setMessage("✅ Photo updated successfully");
    } else {
      if (!imageBase64) {
        alert("Please select an image");
        return;
      }
      const newPhoto = { id: Date.now(), title, image: imageBase64 };
      photoStore.add(newPhoto);
      setMessage("✅ Photo uploaded successfully");
    }

    setPhotos([...photoStore.photos]);
    resetForm();
    clearMessage();
  };

  const editPhoto = (photo) => {
    setTitle(photo.title);
    setEditingId(photo.id);
    setPreviewImage(photo.image);
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const deletePhoto = (id) => {
    if (window.confirm("Are you sure you want to delete this photo?")) {
      photoStore.delete(id);
      setPhotos([...photoStore.photos]);
      setMessage("🗑 Photo deleted successfully");
      clearMessage();
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Photo Management</h2>

      {/* Success Message */}
      {message && <div className="alert alert-success text-center">{message}</div>}

      {/* Form */}
      <form
        onSubmit={addOrUpdatePhoto}
        className="mb-3 d-flex flex-column flex-md-row gap-2 align-items-start"
      >
        <input
          className="form-control"
          placeholder="Photo Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="file"
          className="form-control"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            if (selectedFile) setPreviewImage(URL.createObjectURL(selectedFile));
          }}
          required={!editingId}
        />

        <div className="d-flex gap-2 flex-wrap">
          <button className="btn btn-primary">{editingId ? "Update" : "Add"}</button>
          {editingId && (
            <button type="button" className="btn btn-secondary" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Image Preview */}
      {editingId && previewImage && (
        <div className="mb-4">
          <label className="form-label">Current Image</label>
          <br />
          <img
            src={previewImage}
            alt="Preview"
            style={{
              width: "120px",
              height: "80px",
              objectFit: "cover",
              border: "1px solid #ccc",
            }}
          />
        </div>
      )}

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Preview</th>
              <th>Title</th>
              <th style={{ minWidth: "160px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {photos.length > 0 ? (
              photos.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img
                      src={p.image}
                      alt={p.title}
                      style={{ width: "100px", height: "70px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{p.title}</td>
                  <td>
                    <div className="d-flex flex-wrap gap-2">
                      <button className="btn btn-warning btn-sm" onClick={() => editPhoto(p)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => deletePhoto(p.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No photos added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPhotos;
