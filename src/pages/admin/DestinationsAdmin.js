import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { uploadImageToCloudinary } from "../../utils/cloudinaryService";
import "./AdminPanel.css";

export default function DestinationsAdmin() {
  const [destinations, setDestinations] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchDestinations = async () => {
    setLoading(true);
    setError("");

    try {
      const snapshot = await getDocs(collection(db, "destinations"));
      setDestinations(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    } catch (err) {
      console.error("Failed to fetch destinations", err);
      setError(err.message || "Failed to load destinations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim() || !desc.trim() || !imageFile) {
      setError("Please fill in all fields and select an image.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      // Upload image to Cloudinary
      const imageData = await uploadImageToCloudinary(imageFile, "destinations");

      // Save to Firestore with Cloudinary URL
      await addDoc(collection(db, "destinations"), {
        name: name.trim(),
        desc: desc.trim(),
        imageUrl: imageData.url,
        publicId: imageData.publicId,
        createdAt: serverTimestamp(),
      });

      setName("");
      setDesc("");
      setImageFile(null);
      setImagePreview(null);
      setSuccessMessage("Destination added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      await fetchDestinations();
    } catch (err) {
      console.error("Failed to add destination", err);
      setError(err.message || "Failed to add destination.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this destination?")) return;

    setError("");
    setSuccessMessage("");

    try {
      await deleteDoc(doc(db, "destinations", id));
      setSuccessMessage("Destination deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      await fetchDestinations();
    } catch (err) {
      console.error("Failed to delete destination", err);
      setError(err.message || "Failed to delete destination.");
    }
  };

  return (
    <div className="admin-section">
      {/* Error & Success Messages */}
      {error && <div className="alert alert-error">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      {/* Add Destination Form */}
      <div className="admin-card form-card">
        <h3 className="card-title">📝 Add New Destination</h3>
        <form onSubmit={handleAdd}>
          <div className="form-group">
            <label htmlFor="dest-name">Destination Name</label>
            <input
              id="dest-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Paris, Tokyo, Dubai"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dest-desc">Description</label>
            <textarea
              id="dest-desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Enter a brief description of the destination..."
              className="form-input form-textarea"
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dest-image">🖼️ Destination Image</label>
            <input
              id="dest-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="form-input"
              required
            />
          </div>

          {imagePreview && (
            <div className="image-preview-container" style={{ marginBottom: "15px" }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  maxWidth: "200px",
                  maxHeight: "150px",
                  borderRadius: "8px",
                  border: "2px solid #ddd",
                }}
              />
              <p style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
                {imageFile?.name}
              </p>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Adding..." : "✓ Add Destination"}
          </button>
        </form>
      </div>

      {/* Destinations List */}
      <div className="admin-card">
        <h3 className="card-title">
          📍 Destinations List
          <span className="badge">{destinations.length}</span>
        </h3>

        {loading && <p className="loading-text">Loading destinations...</p>}

        {destinations.length === 0 && !loading ? (
          <div className="empty-state">
            <p>No destinations added yet. Create your first one above!</p>
          </div>
        ) : (
          <div className="destinations-grid">
            {destinations.map((item, index) => (
              <div key={item.id} className="destination-card">
                {item.imageUrl && (
                  <div style={{ marginBottom: "12px", borderRadius: "8px", overflow: "hidden" }}>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
                <div className="card-header">
                  <span className="card-number">{index + 1}</span>
                  <h4 className="destination-name">{item.name}</h4>
                </div>
                <p className="destination-desc">{item.desc}</p>
                <div className="card-footer">
                  <small className="card-meta">
                    Added: {item.createdAt ? new Date(item.createdAt.toDate()).toLocaleDateString() : "N/A"}
                  </small>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
