import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import whatsappIcon from "../Assets/WhatsApp_icon.png";
import { getDestinations } from "../firebase/destinations";
import { getGallery } from "../firebase/gallery";
import { getVehicles } from "../firebase/vehicles";
import { trackGoogleAdsConversion, GOOGLE_ADS_CONFIG } from "../utils/googleAds";
import bgIMG from "../Assets/bgIMG.jpg";
import "./Home.css";

const PHONE = "919815948989";
const PHONE_DISPLAY = "+91 98159 48989";

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

  const handlePhoneClick = (e) => {
    trackGoogleAdsConversion(GOOGLE_ADS_CONFIG.customerId, GOOGLE_ADS_CONFIG.phoneConversionLabel);
  };

  const handleWhatsAppClick = (e) => {
    trackGoogleAdsConversion(GOOGLE_ADS_CONFIG.customerId, GOOGLE_ADS_CONFIG.whatsappConversionLabel);
  };

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
  const popularDests = destinations.filter(d => d.isPopular === true);
  const holyPlaces   = destinations.filter(d => d.isHolyPlace === true);

  // display vehicles
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
      <Helmet>
        <title>TheKalkaTravels — Taxi & Tour Services from Kalka | North India</title>
        <meta name="description" content="Reliable taxi and tour services from Kalka since 1999. Book cabs for Shimla, Manali, Delhi, Chandigarh, Dharamshala and all North India destinations. Call +91 88944 37637." />
        <meta name="keywords" content="Kalka taxi, Kalka to Shimla cab, Kalka to Manali taxi, North India tour, outstation cab Kalka, TheKalkaTravels" />
        <link rel="canonical" href="https://thekalkatravels.com/" />
      </Helmet>

      {/* ===== HERO ===== */}
      <section className="home-hero" style={{ backgroundImage: `url(${bgIMG})` }}>
        <div className="home-hero-overlay" />
        <div className="home-hero-content">
          <div className="home-hero-badge">🏆 Trusted Since 1999</div>
          <h1>Chandigarh Local & Outstation <span className="hero-highlight">Taxi Service</span></h1>
          <p>Book local taxis in Chandigarh, Mohali, Panchkula & Zirakpur or travel comfortably to Shimla, Manali, Delhi, Amritsar and other destinations.</p>
          <div className="home-hero-actions">
            <a href={`tel:${PHONE}`} className="btn btn-accent" onClick={handlePhoneClick}>📞 Book Now</a>
            <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noreferrer" className="btn btn-whatsapp" onClick={handleWhatsAppClick}><img src={whatsappIcon} alt="WhatsApp" style={{ width: "18px", height: "18px", objectFit: "contain" }} /> WhatsApp</a>
            <Link to="/chandigarh-local-taxi" className="btn btn-primary">🚕 Local Taxi Service</Link>
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

      {/* ===== POPULAR DESTINATIONS ===== */}
      {popularDests.length > 0 && (
        <section className="section home-popular-dests-section">
          <div className="container">
            <div className="text-center" style={{ marginBottom: "48px" }}>
              <span className="section-tag">Top Picks</span>
              <h2 className="section-title">Popular Destinations</h2>
              <p className="section-desc">Explore the most loved travel destinations across North India</p>
            </div>
            <div className="popular-dests-grid">
              {popularDests.slice(0, 6).map((d, i) => (
                <div key={d.id || i} className="popular-dest-card">
                  {d.imageUrl ? (
                    <img
                      src={d.imageUrl}
                      alt={d.name}
                      loading="lazy"
                      onError={e => { e.target.style.display = "none"; }}
                    />
                  ) : (
                    <div className="popular-dest-placeholder">📍</div>
                  )}
                  <div className="popular-dest-overlay">
                    <div className="popular-dest-info">
                      {d.state && <span className="popular-dest-state">{d.state}</span>}
                      <h3>{d.name}</h3>
                      <a
                        href={`https://wa.me/${PHONE}?text=${encodeURIComponent(`Hi, I want to book a cab to ${d.name}. Please confirm availability.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="popular-dest-btn"
                      >
                        Book Cab →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {popularDests.length > 6 && (
              <div className="text-center" style={{ marginTop: "36px" }}>
                <Link to="/destinations" className="btn btn-primary">
                  See All Popular Destinations →
                </Link>
              </div>
            )}
            {popularDests.length <= 6 && (
              <div className="text-center" style={{ marginTop: "36px" }}>
                <Link to="/destinations" className="btn btn-primary">
                  View All Destinations →
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===== HOLY PLACES ===== */}
      {holyPlaces.length > 0 && (
        <section className="section home-holy-section">
          <div className="container">
            <div className="text-center" style={{ marginBottom: "48px" }}>
              <span className="section-tag" style={{ background: "rgba(167,139,250,0.15)", color: "#c4b5fd", border: "1px solid rgba(167,139,250,0.4)" }}>🛕 Pilgrimage</span>
              <h2 className="section-title">Holy & Religious Places</h2>
              <p className="section-desc">Sacred destinations — travel comfortably with our trusted cab service</p>
            </div>
            <div className="popular-dests-grid">
              {holyPlaces.slice(0, 6).map((d, i) => (
                <div key={d.id || i} className="popular-dest-card holy-dest-card">
                  {d.imageUrl ? (
                    <img
                      src={d.imageUrl}
                      alt={d.name}
                      loading="lazy"
                      onError={e => { e.target.style.display = "none"; }}
                    />
                  ) : (
                    <div className="popular-dest-placeholder" style={{ background: "linear-gradient(135deg, #f5f3ff, #ede9fe)" }}>🛕</div>
                  )}
                  <div className="popular-dest-overlay">
                    <div className="popular-dest-info">
                      {d.state && <span className="popular-dest-state" style={{ background: "rgba(139,92,246,0.85)" }}>{d.state}</span>}
                      <h3>{d.name}</h3>
                      <a
                        href={`https://wa.me/${PHONE}?text=${encodeURIComponent(`Hi, I want to book a cab to ${d.name} for pilgrimage. Please confirm availability.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="popular-dest-btn"
                        style={{ background: "#7c3aed" }}
                      >
                        Book Cab →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {holyPlaces.length > 6 && (
              <div className="text-center" style={{ marginTop: "36px" }}>
                <Link to="/destinations" className="btn btn-primary">
                  See All Holy Places →
                </Link>
              </div>
            )}
            {holyPlaces.length <= 6 && (
              <div className="text-center" style={{ marginTop: "36px" }}>
                <Link to="/destinations" className="btn btn-primary">
                  View All Destinations →
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

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
                  <a href={`tel:${PHONE}`} className="btn vcn-btn" onClick={handlePhoneClick}>Book Now</a>
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
            <h2 className="section-title">Why Choose KalkaTravells?</h2>
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
              <a href={`tel:${PHONE}`} className="btn btn-accent" onClick={handlePhoneClick}>📞 Call Now</a>
              <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noreferrer" className="btn btn-whatsapp" onClick={handleWhatsAppClick}><img src={whatsappIcon} alt="WhatsApp" style={{ width: "18px", height: "18px", objectFit: "contain" }} /> WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a href={`https://wa.me/${PHONE}`} className="whatsapp-float" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" onClick={handleWhatsAppClick}>
        <img src={whatsappIcon} alt="WhatsApp" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
      </a>
    </>
  );
}

export default Home;
