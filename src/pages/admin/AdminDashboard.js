import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import DestinationsAdmin from "./DestinationsAdmin";
import GalleryAdmin from "./GalleryAdmin";
import VehiclesAdmin from "./VehiclesAdmin";
import "./AdminDashboard.css";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

const NAV = [
  { id: "overview",     label: "Dashboard",    sub: "Overview & Stats",   icon: <IcoDash /> },
  { id: "destinations", label: "Destinations", sub: "Manage Locations",   icon: <IcoPin /> },
  { id: "gallery",      label: "Gallery",      sub: "Manage Images",      icon: <IcoPhoto /> },
  { id: "vehicles",     label: "Vehicles",     sub: "Manage Fleet",       icon: <IcoCar /> },
];

function IcoDash()  { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>; }
function IcoPin()   { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>; }
function IcoPhoto() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>; }
function IcoCar()   { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>; }
function IcoOut()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>; }
function IcoGlobe() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>; }
function IcoMenu()  { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>; }

export default function AdminDashboard() {
  const [tab, setTab]               = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [stats, setStats]           = useState({ destinations: 0, gallery: 0, vehicles: 0 });
  const [loading, setLoading]       = useState(true);
  const [userName, setUserName]     = useState("Kalka Travels");
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      if (user.displayName) setUserName(user.displayName);
      else if (user.email) setUserName(user.email.split("@")[0]);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const [d, g, v] = await Promise.all([
          getDocs(collection(db, "destinations")),
          getDocs(collection(db, "gallery")),
          getDocs(collection(db, "vehicles")),
        ]);
        setStats({ destinations: d.size, gallery: g.size, vehicles: v.size });
      } catch (e) { console.warn(e); }
      finally { setLoading(false); }
    })();
  }, [tab]);

  const handleSignOut = async () => { await signOut(auth); navigate("/admin"); };
  const go = (id) => { setTab(id); setMobileOpen(false); };

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="ad-root">

      {/* ── SIDEBAR ── */}
      <aside className={`ad-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="ad-brand">
          <div className="ad-brand-logo">KT</div>
          <div>
            <p className="ad-brand-name">Kalka Travels</p>
            <p className="ad-brand-role">Admin Panel</p>
          </div>
        </div>

        <p className="ad-nav-label">MENU</p>
        <nav className="ad-nav">
          {NAV.map(n => (
            <button key={n.id} className={`ad-nav-btn ${tab === n.id ? "active" : ""}`} onClick={() => go(n.id)}>
              <span className="ad-nav-icon">{n.icon}</span>
              <span className="ad-nav-text">
                <span className="ad-nav-main">{n.label}</span>
                <span className="ad-nav-sub">{n.sub}</span>
              </span>
              {tab === n.id && <span className="ad-pip" />}
            </button>
          ))}
        </nav>

        <div className="ad-sidebar-bottom">
          <a href="/" target="_blank" rel="noreferrer" className="ad-site-btn">
            <IcoGlobe /> View Website
          </a>
          <button className="ad-logout-btn" onClick={handleSignOut}>
            <IcoOut /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="ad-main">

        {/* Topbar */}
        <header className="ad-topbar">
          <button className="ad-hamburger" onClick={() => setMobileOpen(o => !o)}><IcoMenu /></button>
          <div className="ad-topbar-left">
            <p className="ad-topbar-date">{today}</p>
            <h1 className="ad-topbar-title">{getGreeting()}, {userName} 👋</h1>
          </div>
          <div className="ad-live"><span className="ad-live-dot" /> Live Updates</div>
        </header>

        {/* Body */}
        <div className="ad-body">

          {/* ══ OVERVIEW ══ */}
          {tab === "overview" && (
            <div className="ad-overview">

              {/* Stat Cards */}
              <div className="ad-stats">
                <div className="ad-stat ad-stat-blue">
                  <div className="ad-stat-top">
                    <div className="ad-stat-icon-wrap">
                      <IcoPin />
                    </div>
                    <span className="ad-stat-trend">+{stats.destinations}</span>
                  </div>
                  <p className="ad-stat-val">{loading ? "—" : stats.destinations}</p>
                  <p className="ad-stat-label">Destinations</p>
                  <p className="ad-stat-sub">Unique locations added</p>
                </div>

                <div className="ad-stat ad-stat-purple">
                  <div className="ad-stat-top">
                    <div className="ad-stat-icon-wrap"><IcoPhoto /></div>
                    <span className="ad-stat-trend">+{stats.gallery}</span>
                  </div>
                  <p className="ad-stat-val">{loading ? "—" : stats.gallery}</p>
                  <p className="ad-stat-label">Gallery Images</p>
                  <p className="ad-stat-sub">Photos uploaded</p>
                </div>

                <div className="ad-stat ad-stat-amber">
                  <div className="ad-stat-top">
                    <div className="ad-stat-icon-wrap">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                    </div>
                    <span className="ad-stat-trend">Fleet</span>
                  </div>
                  <p className="ad-stat-val">{loading ? "—" : (stats.vehicles || "0")}</p>
                  <p className="ad-stat-label">Vehicle Types</p>
                  <p className="ad-stat-sub">Fleet available</p>
                </div>

                <div className="ad-stat ad-stat-green">
                  <div className="ad-stat-top">
                    <div className="ad-stat-icon-wrap">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    </div>
                    <span className="ad-stat-trend">Since 1999</span>
                  </div>
                  <p className="ad-stat-val">25+</p>
                  <p className="ad-stat-label">Years of Service</p>
                  <p className="ad-stat-sub">Trusted since 1999</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="ad-section">
                <h2 className="ad-section-title">Quick Actions</h2>
                <div className="ad-actions-grid">
                  <button className="ad-action-card ad-ac-blue" onClick={() => go("destinations")}>
                    <div className="ad-ac-icon"><IcoPin /></div>
                    <div className="ad-ac-body">
                      <p className="ad-ac-title">Manage Destinations</p>
                      <p className="ad-ac-desc">Add or remove travel locations</p>
                    </div>
                    <div className="ad-ac-count">{stats.destinations}</div>
                  </button>

                  <button className="ad-action-card ad-ac-purple" onClick={() => go("gallery")}>
                    <div className="ad-ac-icon"><IcoPhoto /></div>
                    <div className="ad-ac-body">
                      <p className="ad-ac-title">Manage Gallery</p>
                      <p className="ad-ac-desc">Upload or delete images</p>
                    </div>
                    <div className="ad-ac-count">{stats.gallery}</div>
                  </button>

                  <a href="/" target="_blank" rel="noreferrer" className="ad-action-card ad-ac-green">
                    <div className="ad-ac-icon"><IcoGlobe /></div>
                    <div className="ad-ac-body">
                      <p className="ad-ac-title">View Live Website</p>
                      <p className="ad-ac-desc">Opens in a new tab</p>
                    </div>
                    <div className="ad-ac-arrow">↗</div>
                  </a>
                </div>
              </div>

              {/* Info */}
              <div className="ad-info-card">
                <div className="ad-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </div>
                <div>
                  <p className="ad-info-title">Welcome to the Admin Panel</p>
                  <p className="ad-info-desc">Use the sidebar to manage destinations and gallery images. All changes reflect on the website instantly.</p>
                </div>
              </div>

            </div>
          )}

          {/* ══ DESTINATIONS ══ */}
          {tab === "destinations" && (
            <div>
              <div className="ad-tab-header">
                <div>
                  <h2 className="ad-tab-title">Manage Destinations</h2>
                  <p className="ad-tab-sub">Add, view or remove travel destinations shown on the website.</p>
                </div>
                <span className="ad-badge">{stats.destinations} total</span>
              </div>
              <DestinationsAdmin />
            </div>
          )}

          {/* ══ VEHICLES ══ */}
          {tab === "vehicles" && (
            <div>
              <div className="ad-tab-header">
                <div>
                  <h2 className="ad-tab-title">Manage Vehicles</h2>
                  <p className="ad-tab-sub">Add or remove vehicles shown in the services section.</p>
                </div>
                <span className="ad-badge">{stats.vehicles} vehicles</span>
              </div>
              <VehiclesAdmin />
            </div>
          )}

          {/* ══ GALLERY ══ */}
          {tab === "gallery" && (
            <div>
              <div className="ad-tab-header">
                <div>
                  <h2 className="ad-tab-title">Manage Gallery</h2>
                  <p className="ad-tab-sub">Upload and remove images shown in the website gallery.</p>
                </div>
                <span className="ad-badge">{stats.gallery} images</span>
              </div>
              <GalleryAdmin />
            </div>
          )}

        </div>
      </div>

      {mobileOpen && <div className="ad-overlay" onClick={() => setMobileOpen(false)} />}
    </div>
  );
}
