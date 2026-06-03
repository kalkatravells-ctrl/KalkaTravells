import { useEffect, useState } from "react";
import { addDestination, getDestinations, deleteDestination, updateDestination } from "../../firebase/destinations";
import { uploadImageToCloudinary } from "../../utils/cloudinaryService";
import "./AdminPanel.css";

const STATES_UTS = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu",
  "Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman and Nicobar Islands","Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu","Delhi",
  "Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry",
];

/* Defined OUTSIDE so React never remounts it */
function StateSelect({ value, onChange }) {
  return (
    <select className="form-input" value={value} onChange={e => onChange(e.target.value)}>
      <option value="">Select State / UT</option>
      <optgroup label="── States ──">
        {STATES_UTS.slice(0, 28).map(s => <option key={s} value={s}>{s}</option>)}
      </optgroup>
      <optgroup label="── Union Territories ──">
        {STATES_UTS.slice(28).map(s => <option key={s} value={s}>{s}</option>)}
      </optgroup>
    </select>
  );
}

export default function DestinationsAdmin() {
  const [destinations, setDestinations]   = useState([]);
  const [name, setName]                   = useState("");
  const [desc, setDesc]                   = useState("");
  const [state, setState]                 = useState("");
  const [isPopular, setIsPopular]         = useState(false);
  const [isHolyPlace, setIsHolyPlace]     = useState(false);
  const [imageFile, setImageFile]         = useState(null);
  const [imagePreview, setImagePreview]   = useState(null);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState("");
  const [success, setSuccess]             = useState("");

  // Edit modal state
  const [editId, setEditId]                     = useState(null);
  const [editName, setEditName]                 = useState("");
  const [editDesc, setEditDesc]                 = useState("");
  const [editState, setEditState]               = useState("");
  const [editIsPopular, setEditIsPopular]       = useState(false);
  const [editIsHolyPlace, setEditIsHolyPlace]   = useState(false);
  const [editImageFile, setEditImageFile]       = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [editSaving, setEditSaving]             = useState(false);

  const fetchDestinations = async () => {
    setLoading(true);
    try { setDestinations(await getDestinations()); }
    catch (err) { setError(err.message || "Failed to load."); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchDestinations(); }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setEditImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const showSuccess = (msg) => { setSuccess(msg); setTimeout(() => setSuccess(""), 3000); };

  // ── ADD ──
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim() || !desc.trim() || !imageFile) {
      setError("Please fill all fields and select an image."); return;
    }
    setLoading(true); setError("");
    try {
      const img = await uploadImageToCloudinary(imageFile, "destinations");
      await addDestination({
        name: name.trim(), desc: desc.trim(),
        state, isPopular, isHolyPlace,
        imageUrl: img.url, publicId: img.publicId,
      });
      setName(""); setDesc(""); setState(""); setIsPopular(false); setIsHolyPlace(false);
      setImageFile(null); setImagePreview(null);
      showSuccess("Destination added!");
      await fetchDestinations();
    } catch (err) { setError(err.message || "Failed to add."); }
    finally { setLoading(false); }
  };

  // ── OPEN EDIT ──
  const openEdit = (item) => {
    setEditId(item.id);
    setEditName(item.name || "");
    setEditDesc(item.desc || "");
    setEditState(item.state || "");
    setEditIsPopular(item.isPopular || false);
    setEditIsHolyPlace(item.isHolyPlace || false);
    setEditImagePreview(item.imageUrl || null);
    setEditImageFile(null);
  };

  // ── UPDATE ──
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editName.trim() || !editDesc.trim()) { setError("Name and description required."); return; }
    setEditSaving(true); setError("");
    try {
      let imageUrl = destinations.find(d => d.id === editId)?.imageUrl || "";
      let publicId = destinations.find(d => d.id === editId)?.publicId || "";
      if (editImageFile) {
        const img = await uploadImageToCloudinary(editImageFile, "destinations");
        imageUrl = img.url; publicId = img.publicId;
      }
      await updateDestination(editId, {
        name: editName.trim(), desc: editDesc.trim(),
        state: editState || null,
        isPopular: editIsPopular,
        isHolyPlace: editIsHolyPlace,
        imageUrl, publicId,
      });
      setEditId(null);
      showSuccess("Destination updated!");
      await fetchDestinations();
    } catch (err) { setError(err.message || "Failed to update."); }
    finally { setEditSaving(false); }
  };

  // ── DELETE ──
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this destination?")) return;
    try {
      await deleteDestination(id);
      showSuccess("Deleted!");
      await fetchDestinations();
    } catch (err) { setError(err.message || "Failed to delete."); }
  };

  return (
    <div className="admin-section">
      {error   && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* ── ADD FORM ── */}
      <div className="admin-card form-card">
        <h3 className="card-title">📝 Add New Destination</h3>
        <form onSubmit={handleAdd}>
          <div className="vf-row">
            <div className="form-group">
              <label>Destination Name *</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder="e.g., Kangra, Shimla, Manali" className="form-input" required />
            </div>
            <div className="form-group">
              <label>State / Union Territory</label>
              <StateSelect value={state} onChange={setState} />
            </div>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)}
              placeholder="Enter a brief description..." className="form-input form-textarea" rows="4" required />
          </div>

          <div className="form-group">
            <label>🖼️ Destination Image *</label>
            <div className="file-input-wrapper">
              <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" required />
              <span className="file-input-label">{imagePreview ? "✓ Image selected" : "Choose image..."}</span>
            </div>
            {imagePreview && (
              <img src={imagePreview} alt="preview"
                style={{ marginTop:"10px", maxHeight:"140px", borderRadius:"8px", objectFit:"cover" }} />
            )}
          </div>

          <div className="vf-toggles" style={{ marginBottom:"16px" }}>
            <label className="vf-toggle">
              <input type="checkbox" checked={isPopular} onChange={e => setIsPopular(e.target.checked)} />
              <span>⭐ Mark as Popular Place</span>
            </label>
            {isPopular && (
              <span style={{ fontSize:"12px", color:"#fbbf24", background:"rgba(251,191,36,0.1)", padding:"4px 10px", borderRadius:"100px", border:"1px solid rgba(251,191,36,0.2)" }}>
                Will be highlighted on website
              </span>
            )}
            <label className="vf-toggle">
              <input type="checkbox" checked={isHolyPlace} onChange={e => setIsHolyPlace(e.target.checked)} />
              <span>🛕 Holy Place</span>
            </label>
            {isHolyPlace && (
              <span style={{ fontSize:"12px", color:"#a78bfa", background:"rgba(167,139,250,0.1)", padding:"4px 10px", borderRadius:"100px", border:"1px solid rgba(167,139,250,0.2)" }}>
                Marked as Holy Place
              </span>
            )}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Adding..." : "✓ Add Destination"}
          </button>
        </form>
      </div>

      {/* ── LIST ── */}
      <div className="admin-card">
        <h3 className="card-title">
          📍 Destinations List <span className="badge">{destinations.length}</span>
        </h3>
        {loading && <p className="loading-text">Loading...</p>}
        {destinations.length === 0 && !loading && (
          <div className="empty-state"><p>No destinations added yet.</p></div>
        )}
        <div className="destinations-grid">
          {destinations.map((item, index) => (
            <div key={item.id} className="destination-card">
              {item.imageUrl && (
                <div style={{ marginBottom:"12px", borderRadius:"8px", overflow:"hidden" }}>
                  <img src={item.imageUrl} alt={item.name}
                    style={{ width:"100%", height:"180px", objectFit:"cover" }} />
                </div>
              )}
              <div className="card-header">
                <span className="card-number">{index + 1}</span>
                <h4 className="destination-name">{item.name}</h4>
                {item.isPopular && (
                  <span style={{ fontSize:"11px", background:"rgba(251,191,36,0.15)", color:"#fbbf24", border:"1px solid rgba(251,191,36,0.25)", padding:"2px 8px", borderRadius:"100px", fontWeight:"700" }}>
                    ⭐ Popular
                  </span>
                )}
                {item.isHolyPlace && (
                  <span style={{ fontSize:"11px", background:"rgba(167,139,250,0.15)", color:"#a78bfa", border:"1px solid rgba(167,139,250,0.25)", padding:"2px 8px", borderRadius:"100px", fontWeight:"700" }}>
                    🛕 Holy Place
                  </span>
                )}
              </div>
              {item.state && (
                <p style={{ fontSize:"12px", color:"#60a5fa", margin:"4px 0 6px", fontWeight:"600" }}>
                  📍 {item.state}
                </p>
              )}
              <p className="destination-desc">{item.desc}</p>
              <div className="card-footer">
                <small className="card-meta">
                  {item.createdAt ? new Date(item.createdAt.toDate()).toLocaleDateString() : "N/A"}
                </small>
                <div style={{ display:"flex", gap:"8px" }}>
                  <button className="btn btn-small" onClick={() => openEdit(item)}
                    style={{ background:"rgba(59,130,246,0.15)", color:"#60a5fa", border:"1px solid rgba(59,130,246,0.25)" }}>
                    ✏️ Edit
                  </button>
                  <button className="btn btn-delete btn-small" onClick={() => handleDelete(item.id)}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── EDIT MODAL ── */}
      {editId && (
        <div className="vf-modal-overlay" onClick={() => setEditId(null)}>
          <div className="vf-modal" onClick={e => e.stopPropagation()}>
            <div className="vf-modal-header">
              <h3>✏️ Edit Destination</h3>
              <button className="vf-modal-close" onClick={() => setEditId(null)}>✕</button>
            </div>
            <div className="vf-modal-body">
              <form onSubmit={handleUpdate}>
                <div className="vf-row">
                  <div className="form-group">
                    <label>Destination Name *</label>
                    <input type="text" value={editName} onChange={e => setEditName(e.target.value)}
                      className="form-input" required />
                  </div>
                  <div className="form-group">
                    <label>State / Union Territory</label>
                    <StateSelect value={editState} onChange={setEditState} />
                  </div>
                </div>

                <div className="form-group">
                  <label>Description *</label>
                  <textarea value={editDesc} onChange={e => setEditDesc(e.target.value)}
                    className="form-input form-textarea" rows="4" required />
                </div>

                <div className="form-group">
                  <label>🖼️ Image (leave empty to keep current)</label>
                  <div className="file-input-wrapper">
                    <input type="file" accept="image/*" onChange={handleEditImageChange} className="file-input" />
                    <span className="file-input-label">
                      {editImageFile ? "✓ New image selected" : editImagePreview ? "✓ Current image (choose to replace)" : "Choose image..."}
                    </span>
                  </div>
                  {editImagePreview && (
                    <img src={editImagePreview} alt="preview"
                      style={{ marginTop:"10px", maxHeight:"140px", borderRadius:"8px", objectFit:"cover" }} />
                  )}
                </div>

                <div className="vf-toggles" style={{ marginBottom:"16px" }}>
                  <label className="vf-toggle">
                    <input type="checkbox" checked={editIsPopular} onChange={e => setEditIsPopular(e.target.checked)} />
                    <span>⭐ Mark as Popular Place</span>
                  </label>
                  <label className="vf-toggle">
                    <input type="checkbox" checked={editIsHolyPlace} onChange={e => setEditIsHolyPlace(e.target.checked)} />
                    <span>🛕 Holy Place</span>
                  </label>
                </div>

                <div style={{ display:"flex", gap:"12px", marginTop:"8px" }}>
                  <button type="submit" className="btn btn-primary" disabled={editSaving}>
                    {editSaving ? "Saving..." : "✓ Save Changes"}
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
