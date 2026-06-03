import { useEffect, useState } from "react";
import { getVehicles, addVehicle, updateVehicle, deleteVehicle } from "../../firebase/vehicles";
import { uploadImageToCloudinary } from "../../utils/cloudinaryService";
import "./AdminPanel.css";

const CATEGORIES = ["sedan", "suv", "traveller", "bus", "luxury", "hatchback"];
const FUEL_TYPES  = ["petrol", "diesel", "cng", "electric"];
const ICONS       = ["🚗", "🚙", "🚐", "🚌", "🏎️", "🚕"];

const EMPTY = {
  name: "", category: "sedan", fuelType: "petrol",
  seatingCapacity: "", luggageCapacity: "",
  kmCharges: "", hasAC: true,
  cancellationPolicy: "before 6 hours",
  icon: "🚗",
};

/* ── Defined OUTSIDE component so React never remounts it ── */
function VehicleFormFields({ data, onChange, imgPreview, onImage }) {
  return (
    <>
      <div className="vf-row">
        <div className="form-group">
          <label>Vehicle Name *</label>
          <input className="form-input" value={data.name}
            onChange={e => onChange("name", e.target.value)} placeholder="e.g., Innova Crysta" required />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select className="form-input" value={data.category} onChange={e => onChange("category", e.target.value)}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Fuel Type</label>
          <select className="form-input" value={data.fuelType} onChange={e => onChange("fuelType", e.target.value)}>
            {FUEL_TYPES.map(f => <option key={f} value={f}>{f.charAt(0).toUpperCase()+f.slice(1)}</option>)}
          </select>
        </div>
      </div>

      <div className="vf-row">
        <div className="form-group">
          <label>Seating Capacity</label>
          <input className="form-input" type="number" min="1" value={data.seatingCapacity}
            onChange={e => onChange("seatingCapacity", e.target.value)} placeholder="e.g., 4" />
        </div>
        <div className="form-group">
          <label>Luggage Capacity</label>
          <input className="form-input" type="number" min="0" value={data.luggageCapacity}
            onChange={e => onChange("luggageCapacity", e.target.value)} placeholder="e.g., 2" />
        </div>
        <div className="form-group">
          <label>KM Charges</label>
          <input className="form-input" value={data.kmCharges}
            onChange={e => onChange("kmCharges", e.target.value)} placeholder="e.g., 17.89/km" />
        </div>
      </div>

      <div className="vf-row">
        <div className="form-group">
          <label>Cancellation Policy</label>
          <input className="form-input" value={data.cancellationPolicy}
            onChange={e => onChange("cancellationPolicy", e.target.value)} placeholder="before 6 hours" />
        </div>
      </div>

      <div className="vf-toggles">
        <label className="vf-toggle">
          <input type="checkbox" checked={data.hasAC} onChange={e => onChange("hasAC", e.target.checked)} />
          <span>AC Available</span>
        </label>
      </div>

      <div className="form-group">
        <label>Icon</label>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "4px" }}>
          {ICONS.map(ic => (
            <button key={ic} type="button" onClick={() => onChange("icon", ic)}
              style={{
                fontSize: "24px", padding: "7px 11px", borderRadius: "10px", cursor: "pointer",
                border: data.icon === ic ? "2px solid #f97316" : "1px solid rgba(255,255,255,0.1)",
                background: data.icon === ic ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.04)",
              }}>{ic}</button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Vehicle Image</label>
        <div className="file-input-wrapper">
          <input type="file" accept="image/*" onChange={onImage} className="file-input" />
          <span className="file-input-label">
            {imgPreview && !imgPreview.startsWith("data")
              ? "✓ Current image (choose to replace)"
              : imgPreview ? "✓ New image selected" : "Choose image..."}
          </span>
        </div>
        {imgPreview && (
          <img src={imgPreview} alt="preview"
            style={{ marginTop: "10px", maxHeight: "140px", borderRadius: "8px", objectFit: "cover" }} />
        )}
      </div>
    </>
  );
}

export default function VehiclesAdmin() {
  const [vehicles, setVehicles]               = useState([]);
  const [form, setForm]                       = useState(EMPTY);
  const [imageFile, setImageFile]             = useState(null);
  const [imagePreview, setImagePreview]       = useState(null);
  const [loading, setLoading]                 = useState(false);
  const [error, setError]                     = useState("");
  const [success, setSuccess]                 = useState("");
  const [editId, setEditId]                   = useState(null);
  const [editForm, setEditForm]               = useState(EMPTY);
  const [editImageFile, setEditImageFile]     = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [editLoading, setEditLoading]         = useState(false);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      setVehicles(await getVehicles());
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchVehicles(); }, []);

  const set  = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const eSet = (k, v) => setEditForm(f => ({ ...f, [k]: v }));

  const handleImage = (e, isEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => isEdit ? setEditImagePreview(reader.result) : setImagePreview(reader.result);
    reader.readAsDataURL(file);
    isEdit ? setEditImageFile(file) : setImageFile(file);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setError("Vehicle name is required."); return; }
    setLoading(true); setError(""); setSuccess("");
    try {
      let imageUrl = "", publicId = "";
      if (imageFile) {
        const d = await uploadImageToCloudinary(imageFile, "vehicles");
        imageUrl = d.url; publicId = d.publicId;
      }
      await addVehicle({
        ...form, name: form.name.trim(),
        seatingCapacity: Number(form.seatingCapacity) || 0,
        luggageCapacity: Number(form.luggageCapacity) || 0,
        imageUrl, publicId,
      });
      setForm(EMPTY); setImageFile(null); setImagePreview(null);
      setSuccess("Vehicle added!"); setTimeout(() => setSuccess(""), 3000);
      await fetchVehicles();
    } catch (e) { setError(e.message || "Failed to add."); }
    finally { setLoading(false); }
  };

  const openEdit = (v) => {
    setEditId(v.id);
    setEditForm({
      name: v.name || "", category: v.category || "sedan", fuelType: v.fuelType || "petrol",
      seatingCapacity: v.seatingCapacity || "", luggageCapacity: v.luggageCapacity || "",
      kmCharges: v.kmCharges || "", hasAC: v.hasAC ?? true,
      cancellationPolicy: v.cancellationPolicy || "before 6 hours",
      icon: v.icon || "🚗",
    });
    setEditImagePreview(v.imageUrl || null);
    setEditImageFile(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editForm.name.trim()) return;
    setEditLoading(true); setError(""); setSuccess("");
    try {
      let imageUrl = editImagePreview?.startsWith("http") ? editImagePreview : "";
      let publicId = vehicles.find(v => v.id === editId)?.publicId || "";
      if (editImageFile) {
        const d = await uploadImageToCloudinary(editImageFile, "vehicles");
        imageUrl = d.url; publicId = d.publicId;
      }
      await updateVehicle(editId, {
        ...editForm, name: editForm.name.trim(),
        seatingCapacity: Number(editForm.seatingCapacity) || 0,
        luggageCapacity: Number(editForm.luggageCapacity) || 0,
        imageUrl, publicId,
      });
      setEditId(null);
      setSuccess("Vehicle updated!"); setTimeout(() => setSuccess(""), 3000);
      await fetchVehicles();
    } catch (e) { setError(e.message || "Failed to update."); }
    finally { setEditLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this vehicle?")) return;
    try {
      await deleteVehicle(id);
      setSuccess("Deleted!"); setTimeout(() => setSuccess(""), 2000);
      await fetchVehicles();
    } catch (e) { setError(e.message); }
  };

  return (
    <div className="admin-section">
      {error   && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* ADD */}
      <div className="admin-card form-card">
        <h3 className="card-title">🚗 Add New Vehicle</h3>
        <form onSubmit={handleAdd}>
          <VehicleFormFields data={form} onChange={set} imgPreview={imagePreview} onImage={e => handleImage(e)} />
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: "8px" }}>
            {loading ? "Adding..." : "✓ Add Vehicle"}
          </button>
        </form>
      </div>

      {/* LIST */}
      <div className="admin-card">
        <h3 className="card-title">🚘 Vehicles List <span className="badge">{vehicles.length}</span></h3>
        {loading && <p className="loading-text">Loading...</p>}
        {vehicles.length === 0 && !loading ? (
          <div className="empty-state"><p>No vehicles added yet.</p></div>
        ) : (
          <div className="destinations-grid">
            {vehicles.map((v) => (
              <div key={v.id} className="destination-card">
                {v.imageUrl && (
                  <img src={v.imageUrl} alt={v.name}
                    style={{ width:"100%", height:"150px", objectFit:"cover", borderRadius:"10px", marginBottom:"12px" }} />
                )}
                <div className="card-header">
                  <span className="card-number" style={{ fontSize:"18px", background:"rgba(249,115,22,0.15)", color:"#fdba74", minWidth:"36px" }}>
                    {v.icon || "🚗"}
                  </span>
                  <h4 className="destination-name">{v.name}</h4>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"5px", margin:"8px 0" }}>
                  {v.category && <span className="vf-chip">{v.category}</span>}
                  {v.fuelType && <span className="vf-chip">{v.fuelType}</span>}
                  {v.hasAC    && <span className="vf-chip">AC</span>}
                  {v.seatingCapacity ? <span className="vf-chip">👥 {v.seatingCapacity}</span> : null}
                  {v.luggageCapacity ? <span className="vf-chip">🧳 {v.luggageCapacity}</span> : null}
                </div>
                {v.kmCharges  ? <p className="destination-desc" style={{ margin:"2px 0", fontSize:"13px" }}>📍 {v.kmCharges}</p> : null}
                {v.cancellationPolicy ? <p className="destination-desc" style={{ fontSize:"12px" }}>🔄 {v.cancellationPolicy}</p> : null}
                <div className="card-footer">
                  <small className="card-meta">{v.createdAt ? new Date(v.createdAt.toDate()).toLocaleDateString() : "N/A"}</small>
                  <div style={{ display:"flex", gap:"8px" }}>
                    <button className="btn btn-small" onClick={() => openEdit(v)}
                      style={{ background:"rgba(59,130,246,0.15)", color:"#60a5fa", border:"1px solid rgba(59,130,246,0.25)" }}>
                      ✏️ Edit
                    </button>
                    <button className="btn btn-delete btn-small" onClick={() => handleDelete(v.id)}>
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {editId && (
        <div className="vf-modal-overlay" onClick={() => setEditId(null)}>
          <div className="vf-modal" onClick={e => e.stopPropagation()}>
            <div className="vf-modal-header">
              <h3>✏️ Edit Vehicle</h3>
              <button className="vf-modal-close" onClick={() => setEditId(null)}>✕</button>
            </div>
            <div className="vf-modal-body">
              <form onSubmit={handleUpdate}>
                <VehicleFormFields
                  data={editForm} onChange={eSet}
                  imgPreview={editImagePreview} onImage={e => handleImage(e, true)}
                />
                <div style={{ display:"flex", gap:"12px", marginTop:"16px" }}>
                  <button type="submit" className="btn btn-primary" disabled={editLoading}>
                    {editLoading ? "Saving..." : "✓ Save Changes"}
                  </button>
                  <button type="button" className="btn" onClick={() => setEditId(null)}
                    style={{ background:"rgba(255,255,255,0.06)", color:"#9ca3af", border:"1px solid rgba(255,255,255,0.1)" }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
