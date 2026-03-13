import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../../firebase";

export default function GalleryAdmin() {
  const [items, setItems] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    setError("");

    try {
      const snapshot = await getDocs(collection(db, "gallery"));
      setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
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

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db, "gallery"), {
        url,
        name: file.name,
        createdAt: serverTimestamp(),
        storagePath: storageRef.fullPath,
      });

      setFile(null);
      e.target.reset();
      await fetchItems();
    } catch (err) {
      console.error("Failed to upload image", err);
      setError(err.message || "Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item) => {
    setError("");

    try {
      if (!item.storagePath) return;
      await deleteObject(ref(storage, item.storagePath));
      await deleteDoc(doc(db, "gallery", item.id));
      await fetchItems();
    } catch (err) {
      console.error("Failed to delete gallery item", err);
      setError(err.message || "Failed to delete gallery item.");
    }
  };

  return (
    <div>
      <h3>Gallery</h3>
      <p>Upload new images for the public gallery.</p>

      {error && (
        <div style={{
          background: "rgba(220, 38, 38, 0.12)",
          border: "1px solid rgba(220, 38, 38, 0.5)",
          padding: 12,
          borderRadius: 10,
          marginBottom: 16,
          color: "#991b1b",
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <form onSubmit={handleUpload} style={{ marginTop: 18, marginBottom: 24 }}>
        <div style={{ marginBottom: 12 }}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
          />
        </div>

        <button type="submit" className="btn btn-call" disabled={loading}>
          {loading ? "Uploading…" : "Upload Image"}
        </button>
      </form>

      <div className="grid" style={{ marginTop: 0 }}>
        {items.length === 0 && !loading ? (
          <p>No gallery images yet.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="info-card">
              <img
                src={item.url}
                alt={item.name || "gallery"}
                style={{ width: "100%", borderRadius: 12, marginBottom: 12 }}
              />
              <p style={{ marginBottom: 12 }}>{item.name}</p>
              <button
                className="btn"
                style={{ background: "#dc2626" }}
                onClick={() => handleDelete(item)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
