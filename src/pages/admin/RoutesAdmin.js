import { useEffect, useState } from "react";
import { getRoutes, addRoute, updateRoute, deleteRoute } from "../../firebase/routes";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import "./AdminPanel.css";

const EMPTY = {
  from: "",
  to: "",
  vehicleId: "",
  vehicleName: "",
  price: "",
  duration: "",
};

/* Defined OUTSIDE component so React never remounts it on re-render */
function RouteForm({ data, setter, onSubmit, submitLabel, submitting, destinations, vehicles, onVehicleChange }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="vf-row">
        <div className="form-group">
          <label>From *</label>
          <select
            className="form-input"
            value={data.from}
            onChange={e => setter("from", e.target.value)}
            required
          >
            <option value="">Select origin</option>
            {destinations.map(d => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>To *</label>
          <select
            className="form-input"
            value={data.to}
            onChange={e => setter("to", e.target.value)}
            required
          >
            <option value="">Select destination</option>
            {destinations.map(d => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Vehicle *</label>
          <select
            className="form-input"
            value={data.vehicleId}
            onChange={e => onVehicleChange(e.target.value, setter)}
            required
          >
            <option value="">Select vehicle</option>
            {vehicles.map(v => (
              <option key={v.id} value={v.id}>
                {v.name}{v.category ? ` (${v.category})` : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="vf-row">
        <div className="form-group">
          <label>Price (₹) *</label>
          <input
            className="form-input"
            type="number"
            min="0"
            value={data.price}
            onChange={e => setter("price", e.target.value)}
            placeholder="e.g., 3500"
            required
          />
        </div>
        <div className="form-group">
          <label>Duration</label>
          <input
            className="form-input"
            value={data.duration}
            onChange={e => setter("duration", e.target.value)}
            placeholder="e.g., 4-5 hrs"
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary" disabled={submitting} style={{ marginTop: "8px" }}>
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default function RoutesAdmin() {
  const [routes, setRoutes]             = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [vehicles, setVehicles]         = useState([]);
  const [form, setForm]                 = useState(EMPTY);
  const [loading, setLoading]           = useState(false);
  const [saving, setSaving]             = useState(false);
  const [error, setError]               = useState("");
  const [success, setSuccess]           = useState("");
  const [editId, setEditId]             = useState(null);
  const [editForm, setEditForm]         = useState(EMPTY);
  const [editSaving, setEditSaving]     = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      // Fetch each independently so one failure doesn't block the others
      const [r, d, v] = await Promise.allSettled([
        getRoutes(),
        getDocs(collection(db, "destinations")).then(snap => snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))),
        getDocs(collection(db, "vehicles")).then(snap => snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))),
      ]);

      if (r.status === "fulfilled") setRoutes(r.value);
      else console.warn("Routes fetch failed:", r.reason);

      if (d.status === "fulfilled") setDestinations(d.value);
      else console.warn("Destinations fetch failed:", d.reason);

      if (v.status === "fulfilled") setVehicles(v.value);
      else console.warn("Vehicles fetch failed:", v.reason);

    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const set  = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const eSet = (k, v) => setEditForm(f => ({ ...f, [k]: v }));

  const handleVehicleChange = (vehicleId, setter) => {
    const found = vehicles.find(v => v.id === vehicleId);
    setter("vehicleId", vehicleId);
    setter("vehicleName", found ? found.name : "");
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.from || !form.to) { setError("Please select From and To destinations."); return; }
    if (form.from === form.to)  { setError("From and To cannot be the same."); return; }
    if (!form.vehicleId)        { setError("Please select a vehicle."); return; }
    if (!form.price)            { setError("Please enter a price."); return; }
    setSaving(true); setError(""); setSuccess("");
    try {
      await addRoute({
        from: form.from,
        to: form.to,
        vehicleId: form.vehicleId,
        vehicleName: form.vehicleName,
        price: Number(form.price),
        duration: form.duration.trim(),
      });
      setForm(EMPTY);
      setSuccess("Route added!"); setTimeout(() => setSuccess(""), 3000);
      await fetchAll();
    } catch (e) { setError(e.message || "Failed to add route."); }
    finally { setSaving(false); }
  };

  const openEdit = (r) => {
    setEditId(r.id);
    setEditForm({
      from: r.from || "",
      to: r.to || "",
      vehicleId: r.vehicleId || "",
      vehicleName: r.vehicleName || "",
      price: r.price || "",
      duration: r.duration || "",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editForm.from || !editForm.to) { setError("Please select From and To."); return; }
    if (editForm.from === editForm.to)  { setError("From and To cannot be the same."); return; }
    if (!editForm.vehicleId)            { setError("Please select a vehicle."); return; }
    if (!editForm.price)                { setError("Please enter a price."); return; }
    setEditSaving(true); setError(""); setSuccess("");
    try {
      await updateRoute(editId, {
        from: editForm.from,
        to: editForm.to,
        vehicleId: editForm.vehicleId,
        vehicleName: editForm.vehicleName,
        price: Number(editForm.price),
        duration: editForm.duration.trim(),
      });
      setEditId(null);
      setSuccess("Route updated!"); setTimeout(() => setSuccess(""), 3000);
      await fetchAll();
    } catch (e) { setError(e.message || "Failed to update."); }
    finally { setEditSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this route?")) return;
    try {
      await deleteRoute(id);
      setSuccess("Deleted!"); setTimeout(() => setSuccess(""), 2000);
      await fetchAll();
    } catch (e) { setError(e.message); }
  };

  const sharedFormProps = { destinations, vehicles, onVehicleChange: handleVehicleChange };

  return (
    <div className="admin-section">
      {error   && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* ADD */}
      <div className="admin-card form-card">
        <h3 className="card-title">🗺️ Add New Route</h3>
        {!loading && destinations.length === 0 && (
          <div className="alert alert-error" style={{ marginBottom: "16px" }}>
            No destinations found. Please add destinations first.
          </div>
        )}
        {!loading && vehicles.length === 0 && (
          <div className="alert alert-error" style={{ marginBottom: "16px" }}>
            No vehicles found. Please add vehicles first.
          </div>
        )}
        {loading && <p className="loading-text">Loading data...</p>}
        {!loading && (
          <RouteForm
            data={form} setter={set}
            onSubmit={handleAdd} submitLabel="✓ Add Route" submitting={saving}
            {...sharedFormProps}
          />
        )}
      </div>

      {/* LIST */}
      <div className="admin-card">
        <h3 className="card-title">
          🛣️ Routes List <span className="badge">{routes.length}</span>
        </h3>
        {loading && <p className="loading-text">Loading...</p>}
        {!loading && routes.length === 0 && (
          <div className="empty-state"><p>No routes added yet.</p></div>
        )}
        {routes.length > 0 && (
          <div className="routes-table-wrap">
            <table className="routes-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>From</th>
                  <th></th>
                  <th>To</th>
                  <th>Vehicle</th>
                  <th>Price</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((r, i) => (
                  <tr key={r.id}>
                    <td style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>{i + 1}</td>
                    <td><span className="route-chip-from">{r.from}</span></td>
                    <td style={{ color: "#f97316", fontWeight: "700" }}>→</td>
                    <td><span className="route-chip-to">{r.to}</span></td>
                    <td style={{ color: "#e2e8f0", fontSize: "13px" }}>{r.vehicleName}</td>
                    <td style={{ color: "#fbbf24", fontWeight: "700", fontSize: "15px" }}>
                      ₹{Number(r.price).toLocaleString("en-IN")}
                    </td>
                    <td style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>{r.duration || "—"}</td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          className="btn btn-small"
                          onClick={() => openEdit(r)}
                          style={{ background: "rgba(59,130,246,0.15)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.25)" }}
                        >
                          ✏️ Edit
                        </button>
                        <button className="btn btn-delete btn-small" onClick={() => handleDelete(r.id)}>
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {editId && (
        <div className="vf-modal-overlay" onClick={() => setEditId(null)}>
          <div className="vf-modal" onClick={e => e.stopPropagation()}>
            <div className="vf-modal-header">
              <h3>✏️ Edit Route</h3>
              <button className="vf-modal-close" onClick={() => setEditId(null)}>✕</button>
            </div>
            <div className="vf-modal-body">
              <RouteForm
                data={editForm} setter={eSet}
                onSubmit={handleUpdate} submitLabel="✓ Save Changes" submitting={editSaving}
                {...sharedFormProps}
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        .routes-table-wrap { overflow-x: auto; }
        .routes-table { width: 100%; border-collapse: collapse; font-size: 14px; }
        .routes-table th {
          text-align: left; padding: 10px 14px;
          color: rgba(255,255,255,0.4); font-size: 11px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.05em;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .routes-table td {
          padding: 12px 14px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          vertical-align: middle;
        }
        .routes-table tr:last-child td { border-bottom: none; }
        .routes-table tr:hover td { background: rgba(255,255,255,0.02); }
        .route-chip-from {
          background: rgba(59,130,246,0.12); color: #93c5fd;
          border: 1px solid rgba(59,130,246,0.2);
          padding: 3px 10px; border-radius: 100px; font-size: 13px; font-weight: 600;
        }
        .route-chip-to {
          background: rgba(249,115,22,0.12); color: #fdba74;
          border: 1px solid rgba(249,115,22,0.2);
          padding: 3px 10px; border-radius: 100px; font-size: 13px; font-weight: 600;
        }
      `}</style>
    </div>
  );
}
