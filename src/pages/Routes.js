import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Helmet } from "react-helmet-async";
import { db } from "../firebase/config";
import bgIMG from "../Assets/bgIMG.jpg";
import whatsappIcon from "../Assets/WhatsApp_icon.png";
import "./Routes.css";

const PHONE = "918894437637";

export default function RoutesPage() {
  const [routes, setRoutes]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("all");

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const snap = await getDocs(collection(db, "routes"));
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        // Sort by price ascending
        data.sort((a, b) => Number(a.price) - Number(b.price));
        setRoutes(data);
      } catch (e) {
        console.warn("Failed to load routes", e);
      } finally {
        setLoading(false);
      }
    };
    fetchRoutes();
  }, []);

  // Unique vehicle names for filter tabs
  const vehicleNames = ["all", ...new Set(routes.map(r => r.vehicleName).filter(Boolean))];

  const filtered = routes.filter(r => {
    const matchSearch =
      r.from?.toLowerCase().includes(search.toLowerCase()) ||
      r.to?.toLowerCase().includes(search.toLowerCase()) ||
      r.vehicleName?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || r.vehicleName === filter;
    return matchSearch && matchFilter;
  });

  const bookMsg = (r) =>
    `https://wa.me/${PHONE}?text=${encodeURIComponent(
      `Hi, I want to book a cab from ${r.from} to ${r.to} in ${r.vehicleName}. Please confirm availability.`
    )}`;

  return (
    <div className="routes-page">
      <Helmet>
        <title>Routes & Fares — TheKalkaTravels | Transparent Pricing</title>
        <meta name="description" content="Check fares for all major routes — Kalka to Shimla, Chandigarh to Delhi, Manali and more. Transparent pricing, no hidden charges. Book via WhatsApp." />
        <link rel="canonical" href="https://thekalkatravels.com/routes" />
      </Helmet>

      {/* HERO */}
      <section className="routes-hero" style={{ backgroundImage: `url(${bgIMG})` }}>
        <div className="routes-hero-overlay" />
        <div className="routes-hero-content">
          <span className="section-tag" style={{ background: "rgba(249,115,22,0.2)", color: "#fdba74", border: "1px solid rgba(249,115,22,0.4)" }}>
            Routes & Pricing
          </span>
          <h1>Our Routes & Fares</h1>
          <p>Transparent pricing for all major routes. No hidden charges.</p>
        </div>
      </section>

      {/* SEARCH + FILTER */}
      <section className="routes-controls-section">
        <div className="container">
          <div className="routes-controls">
            <div className="routes-search-wrap">
              <svg className="routes-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                className="routes-search"
                type="text"
                placeholder="Search by city or vehicle..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="routes-filter-tabs">
              {vehicleNames.map(v => (
                <button
                  key={v}
                  className={`routes-filter-btn ${filter === v ? "active" : ""}`}
                  onClick={() => setFilter(v)}
                >
                  {v === "all" ? "All Vehicles" : v}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROUTES GRID */}
      <section className="section routes-grid-section">
        <div className="container">
          {loading && (
            <div className="routes-loading">
              <div className="routes-spinner" />
              <p>Loading routes...</p>
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="routes-empty">
              <span style={{ fontSize: "48px" }}>🛣️</span>
              <h3>No routes found</h3>
              <p>Try a different search or filter</p>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="routes-cards-grid">
              {filtered.map((r) => (
                <div key={r.id} className="route-card">
                  <div className="route-card-header">
                    <span className="route-vehicle-badge">{r.vehicleName}</span>
                    {r.duration && <span className="route-duration">⏱ {r.duration}</span>}
                  </div>

                  <div className="route-card-path">
                    <div className="route-city route-from">
                      <span className="route-dot from-dot" />
                      <span>{r.from}</span>
                    </div>
                    <div className="route-arrow-line">
                      <div className="route-line" />
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </div>
                    <div className="route-city route-to">
                      <span className="route-dot to-dot" />
                      <span>{r.to}</span>
                    </div>
                  </div>

                  <div className="route-card-footer">
                    <div className="route-price">
                      <span className="route-price-label">Starting from</span>
                      <span className="route-price-value">₹{Number(r.price).toLocaleString("en-IN")}</span>
                    </div>
                    <a
                      href={bookMsg(r)}
                      target="_blank"
                      rel="noreferrer"
                      className="route-book-btn"
                    >
                      <img src={whatsappIcon} alt="WhatsApp" style={{ width: "16px", height: "16px", objectFit: "contain" }} />
                      Book Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="routes-cta-section">
        <div className="container">
          <div className="routes-cta-box">
            <h2>Can't find your route?</h2>
            <p>Call or WhatsApp us — we cover all destinations across North India</p>
            <div className="routes-cta-btns">
              <a href={`tel:${PHONE}`} className="btn btn-accent">📞 Call Now</a>
              <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
                <img src={whatsappIcon} alt="WhatsApp" style={{ width: "18px", height: "18px", objectFit: "contain" }} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
