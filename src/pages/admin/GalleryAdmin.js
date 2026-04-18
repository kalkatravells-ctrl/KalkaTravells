import { useEffect, useState } from "react";
import { getGallery, addGalleryImage, deleteGalleryImage } from "../../firebase/gallery";
import { uploadImageToCloudinary } from "../../utils/cloudinaryService";
import "./AdminPanel.css";

export default function GalleryAdmin() {
  const [items, setItems] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    setError("");

    try {
      setItems(await getGallery());
    } catch (err) {
      console.error("Failed to load gallery items", err);
      setError(err.message || "Failed to load gallery items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an image to upload.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      // Upload to Cloudinary
      const imageData = await uploadImageToCloudinary(file, "gallery");

      // Save metadata via service
      await addGalleryImage({
        url: imageData.url,
        publicId: imageData.publicId,
        name: file.name,
      });

      setFile(null);
      setPreview(null);
      e.target.reset();
      setSuccessMessage("Image uploaded successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      await fetchItems();
    } catch (err) {
      console.error("Failed to upload image", err);
      setError(err.message || "Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    setError("");
    setSuccessMessage("");

    try {
      // Delete from Firestore via service
      await deleteGalleryImage(item.id);
      setSuccessMessage("Image deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      await fetchItems();
    } catch (err) {
      console.error("Failed to delete gallery item", err);
      setError(err.message || "Failed to delete gallery item.");
    }
  };

  return (
    <div className="admin-section">
      {/* Error & Success Messages */}
      {error && <div className="alert alert-error">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      {/* Upload Form */}
      <div className="admin-card form-card">
        <h3 className="card-title">📤 Upload Gallery Image</h3>
        <form onSubmit={handleUpload}>
          <div className="form-group">
            <label htmlFor="gallery-file">Select Image</label>
            <div className="file-input-wrapper">
              <input
                id="gallery-file"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
                required
              />
              <span className="file-input-label">
                {file ? `✓ ${file.name}` : "Choose an image..."}
              </span>
            </div>
          </div>

          {preview && (
            <div className="preview-container">
              <img src={preview} alt="Preview" className="preview-image" />
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Uploading..." : "✓ Upload Image"}
          </button>
        </form>
      </div>

      {/* Gallery Images */}
      <div className="admin-card">
        <h3 className="card-title">
          🖼️ Gallery Images
          <span className="badge">{items.length}</span>
        </h3>

        {loading && <p className="loading-text">Loading gallery...</p>}

        {items.length === 0 && !loading ? (
          <div className="empty-state">
            <p>No images in the gallery yet. Upload your first image above!</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {items.map((item, index) => (
              <div key={item.id} className="gallery-item">
                <div className="gallery-image-wrapper">
                  <img
                    src={item.url}
                    alt={item.name || "gallery"}
                    className="gallery-image"
                  />
                  <div className="gallery-overlay">
                    <button
                      className="btn btn-delete btn-small"
                      onClick={() => handleDelete(item)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
                <div className="gallery-info">
                  <p className="gallery-name">{item.name}</p>
                  <small className="gallery-date">
                    {item.createdAt ? new Date(item.createdAt.toDate()).toLocaleDateString() : "N/A"}
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
