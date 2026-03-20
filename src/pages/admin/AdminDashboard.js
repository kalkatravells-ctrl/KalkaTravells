import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import DestinationsAdmin from "./DestinationsAdmin";
import GalleryAdmin from "./GalleryAdmin";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("destinations");
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/admin");
  };

  return (
    <div className="admin-container">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2 className="admin-title">Kalka Travels</h2>
          <p className="admin-subtitle">Admin Panel</p>
        </div>

        <nav className="admin-nav">
          <button
            className={`nav-item ${activeTab === "destinations" ? "active" : ""}`}
            onClick={() => setActiveTab("destinations")}
          >
            <span className="nav-icon">📍</span>
            <span>Destinations</span>
          </button>
          <button
            className={`nav-item ${activeTab === "gallery" ? "active" : ""}`}
            onClick={() => setActiveTab("gallery")}
          >
            <span className="nav-icon">🖼️</span>
            <span>Gallery</span>
          </button>
        </nav>

        <button className="btn-logout" onClick={handleSignOut}>
          🚪 Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        <header className="admin-header">
          <div>
            <h1 className="admin-page-title">
              {activeTab === "destinations" ? "Manage Destinations" : "Manage Gallery"}
            </h1>
            <p className="admin-page-subtitle">
              {activeTab === "destinations"
                ? "Add, edit, or remove travel destinations from your platform."
                : "Upload and manage gallery images for your website."}
            </p>
          </div>
        </header>

        <div className="admin-content">
          {activeTab === "destinations" ? <DestinationsAdmin /> : <GalleryAdmin />}
        </div>
      </div>
    </div>
  );
}
