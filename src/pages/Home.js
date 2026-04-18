import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDestinations } from "../firebase/destinations";
import { getGallery } from "../firebase/gallery";
import { getVehicles } from "../firebase/vehicles";
import bgIMG from "../Assets/bgIMG.jpg";
import "./Home.css";

const PHONE = "918894437637";
const PHONE_DISPLAY = "+91 88944 37637";

const ROUTES = [
  "Chandigarh → Delhi", "Delhi → Chandigarh", "Chandigarh → Manali",
  "Chandigarh → Shimla", "Chandigarh → Dharamshala", "Delhi → Amritsar",
  "Chandigarh → Noida", "Noida → Chandigarh", "Chandigarh → Gurugram",
  "Gurugram → Chandigarh", "Chandigarh → Faridabad", "Amritsar → Chandigarh",
];

const STATS = [
  { value: "25+", label: "Years Experience" },
  { value: "10K+", label: "Happy Customers" },
  { value: "50+", label: "Destinations" },
  { value: "24/7", label: "Support" },
];

const FALLBACK_DESTS = [
  "Chandigarh", "Shimla", "Manali", "Dalhousie",
  "Dharamshala", "Spiti Valley", "Amritsar", "Delhi",
  "Kasol", "Kullu", "Mussoorie", "Haridwar",
].map(n => ({ name: n }));

const BENEFITS = [
  { icon: "💳", title: "Part Payment", desc: "Book by paying just 25% now, rest to the driver." },
  { icon: "📅", title: "Advance Booking", desc: "Schedule your ride in advance for a hassle-free journey." },
  { icon: "🛡️", title: "Safe Journey", desc: "Verified drivers and well-maintained vehicles." },
  { icon: "📞", title: "24/7 Support", desc: "Our team is always available to assist you." },
  { icon: "💰", title: "Best Prices", desc: "Transparent pricing with no hidden charges." },
  { icon: "🌍", title: "All India Permit", desc: "Travel anywhere across India without restrictions." },
];

function Home() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [destinations, gallery, vehicles] = await Promise.all([
          getDestinations(),
          getGallery(),
          getVehicles(),
        ]);
        setDestinations(destinations);
        setGalleryImages(gallery.slice(0, 8));
        setVehicles(vehicles);
      } catch (err) {
        console.warn("Failed to load data", err);
      }
    };
    loadData();
  }, []);

  // Merge Firebase destinations with fallback — always show at least 8
  const displayVehicles = vehicles;

  // Merge Firebase destinations with fallback — always show at least 8
  const mergedDests = (() => {
    if (destinations.length >= 8) return destinations.slice(0, 12);
    const fbNames = new Set(destinations.map(d => d.name?.toLowerCase()));
    const extra = FALLBACK_DESTS.filter(d => !fbNames.has(d.name.toLowerCase()));
    return [...destinations, ...extra].slice(0, 12);
  })();

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="home-hero" style={{ backgroundImage: `url(${bgIMG})` }}>
        <div className="home-hero-overlay" />
        <div className="home-hero-content">
          <div className="home-hero-badge">🏆 Trusted Since 1999</div>
          <h1>Your Journey, Our <span className="hero-highlight">Commitment</span></h1>
          <p>Premium taxi & tour services across North India. Safe, comfortable, and affordable travel with experienced drivers.</p>
          <div className="home-hero-actions">
            <a href={`tel:${PHONE}`} className="btn btn-accent">📞 Book Now</a>
            <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noreferrer" className="btn btn-whatsapp">💬 WhatsApp</a>
          </div>
          <div className="home-hero-stats">
            {STATS.map((s, i) => (
              <div key={i} className="hero-stat">
                <span className="hero-stat-value">{s.value}</span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VEHICLES ===== */}
      <section className="section home-vehicles-section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "48px" }}>
            <span className="section-tag">Our Fleet</span>
            <h2 className="section-title">Choose Your Ride</h2>
            <p className="section-desc">Well-maintained vehicles with professional drivers for every journey</p>
          </div>
          <div className="vehicles-grid-cards">
            {displayVehicles.map((v, i) => (
              <div key={v.id || i} className="vehicle-card-new">
                {/* Image */}
                {v.imageUrl && (
                  <div className="vcn-img-wrap">
                    <img src={v.imageUrl} alt={v.name} loading="lazy"
                      onError={e => { e.target.parentElement.style.display = "none"; }} />
                  </div>
                )}
                <div className="vcn-header">
                  <div className="vcn-icon-wrap" style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.2)" }}>
                    <span className="vcn-icon">{v.icon || "🚗"}</span>
                  </div>
                  <span className="vcn-badge">{v.category || v.type || "Vehicle"}</span>
                </div>
                <h3 className="vcn-name">{v.name}</h3>
                <div className="vcn-specs">
                  {(v.seatingCapacity || v.seats) ? (
                    <span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      {v.seatingCapacity || v.seats} Seats
                    </span>
                  ) : null}
                  {(v.luggageCapacity || v.luggage) ? (
                    <span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
                      {v.luggageCapacity || v.luggage} Bags
                    </span>
                  ) : null}
                  {(v.hasAC !== false) && (
                    <span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>
                      AC
                    </span>
                  )}
                  {v.fuelType && <span>⛽ {v.fuelType}</span>}
                </div>
                <div className="vcn-features">
                  {v.features
                    ? v.features.map((f, j) => (
                        <span key={j} className="vcn-feature">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                          {f}
                        </span>
                      ))
                    : [
                        v.cancellationPolicy && `Free cancellation: ${v.cancellationPolicy}`,
                        v.kmCharges && `${v.kmCharges} per km`,
                        v.offerText && v.offerText,
                      ].filter(Boolean).map((f, j) => (
                        <span key={j} className="vcn-feature">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                          {f}
                        </span>
                      ))
                  }
                </div>
                <div className="vcn-footer">
                  <div>
                    <div className="vcn-price">
                      {v.finalPrice ? `₹${Number(v.finalPrice).toLocaleString("en-IN")}` : v.price || "—"}
                      {v.roofCarrierAvailable && v.roofCarrierPrice
                        ? <span style={{ fontSize:"13px", color:"rgba(255,255,255,0.4)", fontWeight:"500", marginLeft:"6px" }}>base</span>
                        : null}
                    </div>
                    {v.roofCarrierAvailable && v.roofCarrierPrice ? (
                      <>
                        <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.35)", margin:"2px 0" }}>
                          + ₹{Number(v.roofCarrierPrice).toLocaleString("en-IN")} roof carrier
                        </div>
                        <div style={{ color:"#34d399", fontWeight:"800", fontSize:"15px", marginTop:"2px" }}>
                          Total: ₹{(Number(v.finalPrice) + Number(v.roofCarrierPrice)).toLocaleString("en-IN")}
                        </div>
                      </>
                    ) : (
                      <div className="vcn-price-note">Starting price</div>
                    )}
                  </div>
                  <a href={`tel:${PHONE}`} className="btn vcn-btn">Book Now</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="section home-benefits-section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "48px" }}>
            <span className="section-tag">Why Us</span>
            <h2 className="section-title">Why Choose TheKalkaTravels?</h2>
            <p className="section-desc">We go beyond just transportation — we deliver experiences</p>
          </div>
          <div className="benefits-grid">
            {BENEFITS.map((b, i) => (
              <div key={i} className="benefit-card">
                <div className="benefit-icon-wrap">
                  <span className="benefit-icon">{b.icon}</span>
                </div>
                <h4>{b.title}</h4>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DESTINATIONS ===== */}
      <section className="section home-dests-section">
        <div className="container">
          <div className="home-dests-header">
            <div>
              <span className="section-tag">Destinations</span>
              <h2 className="section-title" style={{ textAlign: "left" }}>Popular Destinations</h2>
            </div>
            <Link to="/destinations" className="btn btn-primary">View All →</Link>
          </div>
          <div className="home-dests-grid">
            {mergedDests.map((d, i) => (
              <div key={d.id || i} className="home-dest-chip">
                <span>📍</span> {d.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ROUTES ===== */}
      <section className="home-routes-section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "40px" }}>
            <span className="section-tag" style={{ background: "rgba(255,255,255,0.1)", color: "white" }}>Routes</span>
            <h2 className="section-title" style={{ color: "white" }}>Our Regular Routes</h2>
          </div>
          <div className="routes-grid">
            {ROUTES.map((r, i) => (
              <div key={i} className="route-chip">
                <span className="route-arrow">→</span> {r}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      {galleryImages.length > 0 && (
        <section className="section home-gallery-section">
          <div className="container">
            <div className="text-center" style={{ marginBottom: "40px" }}>
              <span className="section-tag">Gallery</span>
              <h2 className="section-title">Our Gallery</h2>
            </div>
            <div className="home-gallery-grid">
              {galleryImages.map((img, i) => (
                <div key={img.id || i} className={`gallery-cell ${i === 0 ? "gallery-cell-large" : ""}`}>
                  <img
                    src={img.url}
                    alt={img.name || `Gallery ${i + 1}`}
                    loading="lazy"
                    onError={e => { e.target.parentElement.style.display = "none"; }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA ===== */}
      <section className="home-cta-section">
        <div className="container">
          <div className="home-cta-box">
            <div className="home-cta-content">
              <h2>Ready for Your Next Journey?</h2>
              <p>Call or WhatsApp us for instant booking and best deals across North India</p>
            </div>
            <div className="home-cta-actions">
              <a href={`tel:${PHONE}`} className="btn btn-accent">📞 Call Now</a>
              <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noreferrer" className="btn btn-whatsapp">💬 WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a href={`https://wa.me/${PHONE}`} className="whatsapp-float" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">💬</a>
    </>
  );
}

export default Home;
