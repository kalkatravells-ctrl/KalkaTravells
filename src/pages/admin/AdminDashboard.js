import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import DestinationsAdmin from "./DestinationsAdmin";
import GalleryAdmin from "./GalleryAdmin";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("destinations");
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/admin");
  };

  return (
    <div className="container" style={{ maxWidth: 1100 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 className="heading">Admin Dashboard</h2>
          <p className="subheading">Manage destinations, gallery images, and more.</p>
        </div>

        <button className="btn" style={{ background: "#dc2626" }} onClick={handleSignOut}>
          Sign out
        </button>
      </div>

      <div style={{ marginTop: 30, marginBottom: 30 }}>
        <button
          onClick={() => setActiveTab("destinations")}
          className="btn"
          style={{
            marginRight: 12,
            background: activeTab === "destinations" ? "#2563eb" : "#64748b",
          }}
        >
          Destinations
        </button>
        <button
          onClick={() => setActiveTab("gallery")}
          className="btn"
          style={{
            background: activeTab === "gallery" ? "#2563eb" : "#64748b",
          }}
        >
          Gallery
        </button>
      </div>

      {activeTab === "destinations" ? <DestinationsAdmin /> : <GalleryAdmin />}
    </div>
  );
}
