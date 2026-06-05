import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import bgIMG from "../Assets/bgIMG.jpg";
import whatsappIcon from "../Assets/WhatsApp_icon.png";
import "./Routes.css";
import "./RouteDetail.css";

const PHONE = "919815948989";
const PHONE_DISPLAY = "+91 98159 48989";

const SEO_SUFFIXES = [
  "One Way & Round Trip Cab",
  "Affordable Cab Booking",
  "Safe & Reliable Cabs",
  "Online Cab Booking",
  "Best Taxi Fare",
  "Comfortable Cab Service",
  "Book Taxi Online",
  "Outstation Cab Booking",
];

// "chandigarh-to-shimla" → { from: "Chandigarh", to: "Shimla" }
function parseSlug(slug) {
  const parts = slug.split("-to-");
  if (parts.length < 2) return null;
  const from = parts[0].replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  const to   = parts.slice(1).join(" to ").replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  return { from, to };
}

// "Chandigarh to Shimla" → "chandigarh-to-shimla"
export function makeSlug(from, to) {
  return `${from.toLowerCase().replace(/\s+/g, "-")}-to-${to.toLowerCase().replace(/\s+/g, "-")}`;
}

export default function RouteDetail() {
  const { slug } = useParams();
  const parsed   = parseSlug(slug || "");
  const [routes, setRoutes]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [allRoutes, setAllRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const snap = await getDocs(collection(db, "routes"));
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setAllRoutes(data);
        if (parsed) {
          const matched = data.filter(
            r => r.from?.toLowerCase() === parsed.from.toLowerCase() &&
                 r.to?.toLowerCase()   === parsed.to.toLowerCase()
          );
          setRoutes(matched);
        }
      } catch (e) {
        console.warn("Failed to load routes", e);
      } finally {
        setLoading(false);
      }
    };
    fetchRoutes();
  }, [slug]); // eslint-disable-line

  if (!parsed) {
    return (
      <div className="container" style={{ padding: "80px 24px", textAlign: "center" }}>
        <h2>Route not found</h2>
        <Link to="/routes" className="btn btn-primary" style={{ marginTop: "20px" }}>← Back to Routes</Link>
      </div>
    );
  }

  const { from, to } = parsed;
  const pageTitle     = `${from} to ${to} Taxi Service | One Way & Round Trip Cab | KalkaTravells`;
  const pageDesc      = `Book ${from} to ${to} taxi at best price. Comfortable, safe and reliable cab service. Available 24/7. Call or WhatsApp ${PHONE_DISPLAY}.`;
  const canonicalSlug = makeSlug(from, to);

  const bookMsg = (r) =>
    `https://wa.me/${PHONE}?text=${encodeURIComponent(
      `Hi, I want to book a cab from ${from} to ${to}${r?.vehicleName ? ` in ${r.vehicleName}` : ""}. Please confirm availability.`
    )}`;

  // Related routes — same "from" city, different destinations
  const relatedRoutes = allRoutes
    .filter(r => r.from?.toLowerCase() === from.toLowerCase() && r.to?.toLowerCase() !== to.toLowerCase())
    .reduce((acc, r) => {
      if (!acc.find(x => x.to === r.to)) acc.push(r);
      return acc;
    }, [])
    .slice(0, 6);

  return (
    <div className="routes-page">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="keywords" content={`${from} to ${to} taxi, ${from} to ${to} cab, ${from} ${to} taxi service, outstation cab ${from}, taxi booking ${from}`} />
        <link rel="canonical" href={`https://kalkatravells.in/routes/${canonicalSlug}`} />
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://kalkatravells.in/routes/${canonicalSlug}`} />
      </Helmet>

      {/* HERO */}
      <section className="routes-hero" style={{ backgroundImage: `url(${bgIMG})` }}>
        <div className="routes-hero-overlay" />
        <div className="routes-hero-content">
          <span className="section-tag" style={{ background: "rgba(249,115,22,0.2)", color: "#fdba74", border: "1px solid rgba(249,115,22,0.4)" }}>
            Taxi Service
          </span>
          <h1>{from} to {to} Taxi</h1>
          <p>Comfortable, safe & affordable cab service. Book now — available 24/7.</p>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div style={{ background: "white", borderBottom: "1px solid var(--gray-200)", padding: "12px 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--gray-500)" }}>
          <Link to="/" style={{ color: "var(--primary)" }}>Home</Link>
          <span>›</span>
          <Link to="/routes" style={{ color: "var(--primary)" }}>Routes</Link>
          <span>›</span>
          <span>{from} to {to}</span>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="section" style={{ background: "var(--gray-50)" }}>
        <div className="container">
          <div className="rd-layout">

            {/* LEFT — route info */}
            <div className="rd-main">
              <h2 className="rd-heading">{from} to {to} Cab Booking</h2>
              <p className="rd-desc">
                Looking for a reliable taxi from <strong>{from}</strong> to <strong>{to}</strong>? KalkaTravells offers comfortable, safe, and affordable cab services on this route. Our experienced drivers ensure a smooth journey with door-to-door pickup.
              </p>

              {/* Available vehicles */}
              {loading ? (
                <div className="routes-loading"><div className="routes-spinner" /><p>Loading...</p></div>
              ) : routes.length > 0 ? (
                <>
                  <h3 className="rd-sub-heading">Available Vehicles on This Route</h3>
                  <div className="rd-vehicle-list">
                    {routes.map(r => (
                      <div key={r.id} className="rd-vehicle-card">
                        <div className="rd-vehicle-info">
                          <span className="route-vehicle-badge">{r.vehicleName}</span>
                          {r.duration && <span className="route-duration" style={{ marginLeft: "8px" }}>⏱ {r.duration}</span>}
                        </div>
                        <a href={bookMsg(r)} target="_blank" rel="noreferrer" className="route-book-btn">
                          <img src={whatsappIcon} alt="WhatsApp" style={{ width: "16px", height: "16px", objectFit: "contain" }} />
                          Book Now
                        </a>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="rd-no-vehicle">
                  <p>Pricing details not listed yet — call or WhatsApp us for a quote.</p>
                  <div style={{ display: "flex", gap: "12px", marginTop: "16px", flexWrap: "wrap" }}>
                    <a href={`tel:${PHONE}`} className="btn btn-accent">📞 Call Now</a>
                    <a href={bookMsg(null)} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
                      <img src={whatsappIcon} alt="WhatsApp" style={{ width: "18px", height: "18px", objectFit: "contain" }} /> WhatsApp
                    </a>
                  </div>
                </div>
              )}

              {/* Why choose us */}
              <h3 className="rd-sub-heading" style={{ marginTop: "40px" }}>Why Book {from} to {to} Cab with Us?</h3>
              <div className="rd-features">
                {[
                  { icon: "✅", text: "Professional & verified drivers" },
                  { icon: "✅", text: "Clean, well-maintained vehicles" },
                  { icon: "✅", text: "Transparent pricing, no hidden charges" },
                  { icon: "✅", text: "Available 24/7, even on holidays" },
                  { icon: "✅", text: "One way & round trip options" },
                  { icon: "✅", text: "Door-to-door pickup & drop" },
                ].map((f, i) => (
                  <div key={i} className="rd-feature-item">
                    <span>{f.icon}</span> {f.text}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — booking sidebar */}
            <div className="rd-sidebar">
              <div className="rd-book-card">
                <h3>Book {from} → {to} Cab</h3>
                <p>Get instant confirmation. Call or WhatsApp now.</p>
                <a href={`tel:${PHONE}`} className="btn btn-accent" style={{ width: "100%", justifyContent: "center", marginBottom: "12px" }}>
                  📞 {PHONE_DISPLAY}
                </a>
                <a href={bookMsg(null)} target="_blank" rel="noreferrer" className="btn btn-whatsapp" style={{ width: "100%", justifyContent: "center" }}>
                  <img src={whatsappIcon} alt="WhatsApp" style={{ width: "18px", height: "18px", objectFit: "contain" }} /> WhatsApp Us
                </a>
                <div className="rd-book-note">
                  <span>🕐</span> Available 24/7 · Instant Booking
                </div>
              </div>

              {/* SEO links — related routes */}
              {relatedRoutes.length > 0 && (
                <div className="rd-related">
                  <h4>Other Routes from {from}</h4>
                  {relatedRoutes.map((r, i) => (
                    <Link key={i} to={`/routes/${makeSlug(r.from, r.to)}`} className="rd-related-link">
                      {r.from} → {r.to}
                      <span>→</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* SEO TEXT — Google indexes this */}
      <section style={{ background: "white", padding: "48px 0" }}>
        <div className="container">
          <h2 style={{ fontSize: "22px", fontWeight: "800", color: "var(--dark-light)", marginBottom: "16px" }}>
            {from} to {to} Taxi Service — Everything You Need to Know
          </h2>
          <div className="rd-seo-text">
            <p>
              KalkaTravells provides reliable <strong>{from} to {to} taxi service</strong> at the most affordable rates. Whether you need a one-way cab or a round trip, we have got you covered with a range of vehicles including Sedans, SUVs, Innova, and Tempo Travellers.
            </p>
            <p>
              Our <strong>{from} to {to} cab booking</strong> service is available 24/7. Simply call or WhatsApp us at {PHONE_DISPLAY} to confirm your booking instantly. We offer door-to-door pickup from anywhere in {from}.
            </p>
            <p>
              All our drivers are experienced, verified, and well-versed with the {from} to {to} route. We ensure safe, comfortable, and on-time travel for all our passengers.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
