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

export default function DestinationsAdmin() {
  const [destinations, setDestinations] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim() || !desc.trim()) return;

    setLoading(true);
    setError("");

    try {
      await addDoc(collection(db, "destinations"), {
        name: name.trim(),
        desc: desc.trim(),
        createdAt: serverTimestamp(),
      });
      setName("");
      setDesc("");
      await fetchDestinations();
    } catch (err) {
      console.error("Failed to add destination", err);
      setError(err.message || "Failed to add destination.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setError("");

    try {
      await deleteDoc(doc(db, "destinations", id));
      await fetchDestinations();
    } catch (err) {
      console.error("Failed to delete destination", err);
      setError(err.message || "Failed to delete destination.");
    }
  };

  return (
    <div>
      <h3>Destinations</h3>
      <p>Add or remove destinations that appear on the public site.</p>

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

      <form onSubmit={handleAdd} style={{ marginTop: 18, marginBottom: 24 }}>
        <div style={{ marginBottom: 12 }}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Destination name"
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #cbd5e1" }}
            required
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Short description"
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #cbd5e1" }}
            required
          />
        </div>

        <button type="submit" className="btn btn-call" disabled={loading}>
          {loading ? "Saving…" : "Add Destination"}
        </button>
      </form>

      <div className="grid" style={{ marginTop: 0 }}>
        {destinations.length === 0 && !loading ? (
          <p>No destinations found.</p>
        ) : (
          destinations.map((item) => (
            <div key={item.id} className="info-card">
              <h4 style={{ marginBottom: 8 }}>{item.name}</h4>
              <p style={{ marginBottom: 12 }}>{item.desc}</p>
              <button
                className="btn"
                style={{ background: "#dc2626" }}
                onClick={() => handleDelete(item.id)}
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
