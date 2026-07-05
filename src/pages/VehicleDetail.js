import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import bgIMG from "../Assets/bgIMG.jpg";
import whatsappIcon from "../Assets/WhatsApp_icon.png";
import "./Routes.css";
import "./VehicleDetail.css";

const PHONE = "919815948989";
const PHONE_DISPLAY = "+91 98159 48989";
const SITE_URL = "https://kalkatravells.in";

// Static rich content per vehicle slug
const VEHICLE_CONTENT = {
  "tempo-traveller": {
    displayName: "Tempo Traveller",
    emoji: "🚌",
    tagline: "Best for large groups — 12 to 14 passengers",
    capacity: "12–14 passengers",
    luggage: "Large luggage space",
    ac: true,
    bestFor: ["Family trips", "Group tours", "Corporate outings", "Pilgrimage trips"],
    features: [
      "Pushback recliner seats",
      "Large roof luggage carrier",
      "Heavy AC with individual vents",
      "GPS tracking",
      "First aid kit",
      "Music system",
    ],
    content: [
      "The Tempo Traveller is the most popular choice for group travel across North India. With seating for 12 to 14 passengers and generous luggage space — including a roof carrier — it is ideal for family tours, corporate outings, school trips, and pilgrimage journeys to destinations like Vaishno Devi, Amritsar, Shimla, Manali, and Dharamshala.",
      "KalkaTravells operates a well-maintained fleet of Force Tempo Travellers, each fitted with pushback recliner seats, heavy-duty air conditioning with individual overhead vents, and large glass windows for panoramic views. Our Tempo Travellers are regularly serviced and inspected to ensure maximum comfort on long-distance Himachal and Punjab routes.",
      "Whether you need a one-way Tempo Traveller from Chandigarh to Manali or a round-trip booking for a Vaishno Devi yatra, KalkaTravells provides 24/7 availability with experienced drivers who know mountain roads. Call or WhatsApp us at " + PHONE_DISPLAY + " for instant fare and availability confirmation.",
    ],
    faqs: [
      { q: "How many people can travel in a Tempo Traveller?", a: "A standard Tempo Traveller seats 12 to 14 passengers comfortably with luggage. KalkaTravells operates Force Tempo Travellers with pushback seats for added comfort on long journeys." },
      { q: "Is AC available in the Tempo Traveller?", a: "Yes, all KalkaTravells Tempo Travellers are fully air-conditioned with individual overhead vents for each seat." },
      { q: "What is the per km charge for Tempo Traveller?", a: "Charges vary by route. Please call or WhatsApp us at " + PHONE_DISPLAY + " for the latest per-km rate and package pricing for your specific route." },
      { q: "Is a roof carrier available on the Tempo Traveller?", a: "Yes, a roof carrier is available for extra luggage — ideal for large group trips with heavy bags." },
      { q: "Can I book a Tempo Traveller for a hill station trip?", a: "Absolutely. Our Tempo Travellers are driven by experienced mountain drivers and are suitable for Shimla, Manali, Dharamshala, Dalhousie, Spiti, and other Himachal routes." },
    ],
    popularRoutes: ["Chandigarh to Manali", "Delhi to Manali", "Chandigarh to Shimla", "Amritsar to Vaishno Devi", "Delhi to Dharamshala"],
  },
  "innova-crysta": {
    displayName: "Innova Crysta",
    emoji: "🚙",
    tagline: "Premium 6-seater — Most comfortable outstation cab",
    capacity: "6–7 passengers",
    luggage: "3 large bags",
    ac: true,
    bestFor: ["Family outstation trips", "Corporate travel", "Airport transfers", "Hill station tours"],
    features: [
      "Captain seats with armrests",
      "Powerful AC — front and rear",
      "Ample boot space",
      "Smooth ride on mountain roads",
      "GPS enabled",
      "USB charging points",
    ],
    content: [
      "The Toyota Innova Crysta is the gold standard for outstation cab travel in North India. With its powerful 2.4L diesel engine, premium captain seats, and spacious interiors, it is the first choice for families and corporate travelers heading to Shimla, Manali, Dharamshala, Chandigarh, and other destinations.",
      "KalkaTravells Innova Crysta cabs offer exceptional comfort over long distances. The elevated seating position gives passengers panoramic views — especially valuable on scenic mountain routes like Chandigarh to Manali or Delhi to Shimla. The boot space easily accommodates 3 to 4 large suitcases, making it perfect for family trips.",
      "Unlike smaller cabs, the Innova Crysta handles mountain curves and steep gradients with confidence, thanks to its torquey diesel engine. All our Innova Crysta vehicles are well-maintained, clean, and driven by experienced outstation drivers. Available 24/7 — book your Innova Crysta cab by calling " + PHONE_DISPLAY + ".",
    ],
    faqs: [
      { q: "How many people can sit in an Innova Crysta?", a: "The Toyota Innova Crysta comfortably seats 6 to 7 passengers with luggage. It has two rows of seats plus the rear bench." },
      { q: "Is Innova Crysta suitable for hill station travel?", a: "Yes, it is one of the best vehicles for hill stations. The diesel engine handles mountain gradients well and the suspension is designed for varied terrain." },
      { q: "What is the fare for Innova Crysta?", a: "Fares depend on the route. Contact us at " + PHONE_DISPLAY + " for the current Innova Crysta fare for your specific route. We offer both per-km and fixed package rates." },
      { q: "Is AC available throughout the journey?", a: "Yes, the Innova Crysta has dual-zone climate control — separate AC vents for front and rear passengers — ensuring comfort throughout the journey." },
      { q: "Can I book Innova Crysta for airport pickup?", a: "Yes, we offer Innova Crysta for airport transfers at Chandigarh, Delhi IGI, and Gaggal (Kangra) airports. Book in advance for assured availability." },
    ],
    popularRoutes: ["Chandigarh to Manali", "Delhi to Shimla", "Delhi to Dharamshala", "Chandigarh to Shimla", "Delhi to Manali"],
  },
  "sedan": {
    displayName: "Sedan",
    emoji: "🚗",
    tagline: "Affordable 4-seater — Best for couples and solo travelers",
    capacity: "4 passengers",
    luggage: "2 medium bags",
    ac: true,
    bestFor: ["Solo travel", "Couple trips", "Airport transfers", "Short outstation trips"],
    features: [
      "Fuel-efficient diesel/CNG",
      "Full AC",
      "Comfortable for 3–4 passengers",
      "Boot space for 2 bags",
      "GPS enabled",
      "Economical per-km rates",
    ],
    content: [
      "The Sedan is the most economical outstation cab option from KalkaTravells — ideal for solo travelers, couples, or a group of 3 to 4 passengers. We operate Swift Dzire and Toyota Etios sedans, both known for their fuel efficiency, smooth ride, and reliable performance on long-distance highway routes.",
      "For routes like Delhi to Chandigarh, Chandigarh to Shimla, or Amritsar to Dharamshala, a Sedan offers the best value for money. The boot comfortably fits 2 medium suitcases. If you are traveling light with 2 to 3 people, a Sedan is significantly cheaper than an SUV or Innova while providing full AC comfort.",
      "KalkaTravells Sedan cabs are available 24/7 for both one-way and round-trip bookings. Our drivers are commercially licensed and experienced on all major North India routes including Himachal Pradesh mountain roads. Call " + PHONE_DISPLAY + " to book your Sedan cab instantly.",
    ],
    faqs: [
      { q: "Which Sedan models does KalkaTravells use?", a: "We primarily use Swift Dzire and Toyota Etios — both are well-maintained, fuel-efficient, and comfortable for 3 to 4 passengers." },
      { q: "Is a Sedan suitable for mountain routes like Manali or Shimla?", a: "Yes, for groups of 2 to 3 with light luggage. For heavier loads or larger groups, we recommend SUV or Innova Crysta." },
      { q: "What is the cheapest cab option for one-way travel?", a: "A Sedan is the most affordable option. Call us at " + PHONE_DISPLAY + " for current one-way fares on your route." },
      { q: "Is the Sedan AC?", a: "Yes, all KalkaTravells Sedan cabs are fully air-conditioned." },
      { q: "Can I book a Sedan for late-night travel?", a: "Yes, we operate 24/7. Sedans are available for any departure time including early morning or late night." },
    ],
    popularRoutes: ["Delhi to Chandigarh", "Chandigarh to Shimla", "Amritsar to Dharamshala", "Chandigarh to Amritsar", "Delhi to Shimla"],
  },
  "suv": {
    displayName: "SUV",
    emoji: "🚙",
    tagline: "Spacious 6-seater — Best value for families",
    capacity: "6–7 passengers",
    luggage: "3 medium bags",
    ac: true,
    bestFor: ["Family trips", "Group travel", "Long highway routes", "Comfortable outstation travel"],
    features: [
      "Maruti Ertiga / similar",
      "Full AC with rear vents",
      "Spacious third row",
      "Good luggage space",
      "Smooth highway performance",
      "GPS enabled",
    ],
    content: [
      "The SUV category at KalkaTravells primarily includes the Maruti Ertiga — a practical and comfortable 6 to 7 seater that bridges the gap between an affordable Sedan and a premium Innova Crysta. The Ertiga is particularly popular for family trips where 5 to 6 people need comfortable seating without the higher cost of an Innova.",
      "With three full rows of seating, generous AC coverage, and a decent boot space, the SUV is well-suited for routes like Chandigarh to Manali, Delhi to Dharamshala, and Amritsar to Shimla. On highway routes, the Ertiga delivers a smooth, fuel-efficient ride. Our SUVs are driven by experienced outstation drivers.",
      "KalkaTravells SUVs are available for both one-way and round-trip bookings. Whether you need an SUV from Chandigarh to Dharamshala for a family trip or from Delhi to Chandigarh for a corporate group, we have availability 24/7. Book instantly — call or WhatsApp " + PHONE_DISPLAY + ".",
    ],
    faqs: [
      { q: "Which SUV does KalkaTravells provide?", a: "We primarily provide the Maruti Ertiga in our SUV category — a reliable, spacious 6 to 7 seater with full AC." },
      { q: "What is the difference between SUV and Innova Crysta?", a: "The Innova Crysta is more premium with captain seats and a more powerful engine. The SUV (Ertiga) is more affordable while still seating 6 to 7 comfortably." },
      { q: "Is SUV suitable for hill station travel?", a: "Yes, suitable for routes like Shimla, Dharamshala, and Manali. For very high altitude routes like Spiti, Innova or Tempo Traveller is recommended." },
      { q: "How many bags fit in an SUV?", a: "The boot space comfortably fits 2 to 3 medium-sized bags. Additional bags can be placed in the footwell if needed." },
      { q: "Is AC available in all rows?", a: "Yes, the Ertiga has AC vents for all three rows, ensuring comfort for all passengers." },
    ],
    popularRoutes: ["Chandigarh to Manali", "Delhi to Dharamshala", "Chandigarh to Amritsar", "Amritsar to Shimla", "Delhi to Chandigarh"],
  },
};

// Slug-to-display fallback
function getVehicleContent(slug) {
  return VEHICLE_CONTENT[slug] || null;
}

// Make a URL-friendly slug from vehicle name
export function makeVehicleSlug(name) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function Stars({ count }) {
  return (
    <span className="vd-stars" aria-label={`${count} out of 5 stars`}>
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

const REVIEWS = [
  { name: "Suresh Kumar", rating: 5, location: "Chandigarh", text: "Booked Innova Crysta for Manali trip. Excellent vehicle, very clean and driver was very professional. Highly recommend KalkaTravells." },
  { name: "Neha Gupta", rating: 5, location: "Delhi", text: "Used Tempo Traveller for a group of 12 to Shimla. Perfect experience, AC worked great in the hills too. Will book again!" },
  { name: "Vikram Singh", rating: 5, location: "Amritsar", text: "Sedan cab from Amritsar to Dharamshala. On-time pickup, smooth journey, transparent pricing. Very satisfied." },
];

export default function VehicleDetail() {
  const { slug } = useParams();
  const content = getVehicleContent(slug);

  const [vehicle, setVehicle] = useState(null);
  const [allVehicles, setAllVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const snap = await getDocs(collection(db, "vehicles"));
        const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setAllVehicles(all);
        // Match by slug field first, then fallback to name-based slug
        const matched = all.find(
          v => v.slug === slug || makeVehicleSlug(v.name || "") === slug
        );
        setVehicle(matched || null);
      } catch (e) {
        console.warn("Failed to load vehicle", e);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [slug]);

  // If no static content AND no Firebase match — show 404
  if (!loading && !content && !vehicle) {
    return (
      <div className="container" style={{ padding: "80px 24px", textAlign: "center" }}>
        <h2>Vehicle not found</h2>
        <Link to="/services" className="btn btn-primary" style={{ marginTop: "20px" }}>
          Back to Services
        </Link>
      </div>
    );
  }

  const displayName = content?.displayName || vehicle?.name || slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  const emoji = content?.emoji || vehicle?.icon || "🚗";
  const tagline = content?.tagline || `${displayName} cab service — comfortable & affordable`;
  const capacity = content?.capacity || (vehicle?.seatingCapacity ? `${vehicle.seatingCapacity} passengers` : "Contact for details");
  const canonicalURL = `${SITE_URL}/vehicles/${slug}`;

  const pageTitle = `${displayName} Taxi Service | Book ${displayName} Cab | KalkaTravells`;
  const pageDesc = `Book ${displayName} cab with KalkaTravells. ${tagline}. Available 24/7 for outstation travel across North India. Call ${PHONE_DISPLAY}.`;
  const pageKeywords = `${displayName} taxi, ${displayName} cab, book ${displayName}, ${displayName} rental, ${displayName} outstation, ${displayName} Chandigarh, ${displayName} Delhi, ${displayName} Manali`;

  const bookMsg = `https://wa.me/${PHONE}?text=${encodeURIComponent(`Hi, I want to book a ${displayName} cab. Please confirm availability and fare.`)}`;

  const schemaOrg = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": "Vehicles", "item": `${SITE_URL}/vehicles` },
          { "@type": "ListItem", "position": 3, "name": `${displayName}`, "item": canonicalURL },
        ],
      },
      {
        "@type": "Service",
        "name": `${displayName} Taxi Service`,
        "description": pageDesc,
        "url": canonicalURL,
        "provider": {
          "@type": "Organization",
          "name": "KalkaTravells",
          "telephone": "+919815948989",
          "url": SITE_URL,
        },
        "serviceType": "Taxi Service",
        "areaServed": ["Chandigarh", "Delhi", "Shimla", "Manali", "Dharamshala", "Amritsar"],
      },
      ...(content?.faqs ? [{
        "@type": "FAQPage",
        "mainEntity": content.faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      }] : []),
      {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "3",
        "bestRating": "5",
        "itemReviewed": { "@type": "Service", "name": `${displayName} Taxi Service` },
      },
    ],
  };

  return (
    <div className="routes-page">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={canonicalURL} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalURL} />
        <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
      </Helmet>

      {/* HERO */}
      <section className="routes-hero" style={{ backgroundImage: `url(${bgIMG})` }}>
        <div className="routes-hero-overlay" />
        <div className="routes-hero-content">
          <span className="section-tag" style={{ background: "rgba(249,115,22,0.2)", color: "#fdba74", border: "1px solid rgba(249,115,22,0.4)" }}>
            {emoji} Cab Service
          </span>
          <h1>{displayName} Taxi Service</h1>
          <p>{tagline}</p>
          <div className="rd-hero-badges">
            <span>👥 {capacity}</span>
            {content?.ac && <span>❄️ Full AC</span>}
            <span>🕐 Available 24/7</span>
          </div>
        </div>
      </section>

      {/* BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="rd-breadcrumb-bar">
        <div className="container">
          <ol className="rd-breadcrumb">
            <li className="rd-bc-item"><Link to="/" className="rd-bc-link"><span className="rd-bc-icon">🏠</span> Home</Link></li>
            <li className="rd-bc-sep" aria-hidden="true">›</li>
            <li className="rd-bc-item"><Link to="/services" className="rd-bc-link">Vehicles</Link></li>
            <li className="rd-bc-sep" aria-hidden="true">›</li>
            <li className="rd-bc-item rd-bc-current" aria-current="page">{displayName}</li>
          </ol>
        </div>
      </nav>

      {/* MAIN */}
      <section className="section" style={{ background: "var(--gray-50)" }}>
        <div className="container">
          <div className="rd-layout">

            {/* LEFT */}
            <div className="rd-main">

              <h2 className="rd-heading">{displayName} Cab — Overview</h2>

              {/* Vehicle image from Firebase */}
              {!loading && vehicle?.imageUrl && (
                <div className="vd-image-wrap">
                  <img
                    src={vehicle.imageUrl}
                    alt={`${displayName} cab for hire — KalkaTravells`}
                    className="vd-image"
                  />
                  <div className="vd-image-label">
                    <span>{emoji} {displayName}</span>
                    <span className="vd-image-badge">Available Now</span>
                  </div>
                </div>
              )}

              {/* Specs grid */}
              <div className="vd-specs-grid">
                <div className="vd-spec-item">
                  <span className="vd-spec-icon">👥</span>
                  <div><strong>Seating</strong><p>{capacity}</p></div>
                </div>
                <div className="vd-spec-item">
                  <span className="vd-spec-icon">🧳</span>
                  <div><strong>Luggage</strong><p>{content?.luggage || (vehicle?.luggageCapacity ? `${vehicle.luggageCapacity} bags` : "Standard")}</p></div>
                </div>
                <div className="vd-spec-item">
                  <span className="vd-spec-icon">❄️</span>
                  <div><strong>AC</strong><p>{content?.ac ?? vehicle?.hasAC ? "Full AC" : "Non-AC"}</p></div>
                </div>
                <div className="vd-spec-item">
                  <span className="vd-spec-icon">📍</span>
                  <div><strong>KM Charges</strong><p>{vehicle?.kmCharges || "Call for rate"}</p></div>
                </div>
              </div>

              {/* Best for */}
              {content?.bestFor && (
                <>
                  <h3 className="rd-sub-heading" style={{ marginTop: "32px" }}>Best For</h3>
                  <div className="vd-bestfor-grid">
                    {content.bestFor.map((b, i) => (
                      <div key={i} className="vd-bestfor-item">✅ {b}</div>
                    ))}
                  </div>
                </>
              )}

              {/* Features */}
              {content?.features && (
                <>
                  <h3 className="rd-sub-heading" style={{ marginTop: "32px" }}>Vehicle Features</h3>
                  <div className="rd-features">
                    {content.features.map((f, i) => (
                      <div key={i} className="rd-feature-item"><span>✅</span> {f}</div>
                    ))}
                  </div>
                </>
              )}

              {/* Content */}
              {content?.content && (
                <>
                  <h3 className="rd-sub-heading" style={{ marginTop: "36px" }}>About {displayName} Cab Service</h3>
                  <div className="rd-seo-text">
                    {content.content.map((para, i) => <p key={i}>{para}</p>)}
                  </div>
                </>
              )}

              {/* Popular routes */}
              {content?.popularRoutes && (
                <>
                  <h3 className="rd-sub-heading" style={{ marginTop: "36px" }}>Popular Routes for {displayName}</h3>
                  <div className="vd-routes-grid">
                    {content.popularRoutes.map((r, i) => {
                      const [from, to] = r.split(" to ");
                      const routeSlug = from && to
                        ? `${from.toLowerCase().replace(/\s+/g, "-")}-to-${to.toLowerCase().replace(/\s+/g, "-")}`
                        : null;
                      return (
                        <Link key={i} to={routeSlug ? `/routes/${routeSlug}` : "/routes"} className="rd-link-card">
                          <span className="rd-link-route">{r}</span>
                          <span className="rd-link-arrow">→</span>
                        </Link>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Reviews */}
              <h3 className="rd-sub-heading" style={{ marginTop: "40px" }}>Customer Reviews</h3>
              <div className="rd-reviews">
                {REVIEWS.map((r, i) => (
                  <div key={i} className="rd-review-card">
                    <div className="rd-review-header">
                      <div className="rd-reviewer-avatar">{r.name.charAt(0)}</div>
                      <div><strong>{r.name}</strong><span className="rd-reviewer-loc">📍 {r.location}</span></div>
                      <Stars count={r.rating} />
                    </div>
                    <p className="rd-review-text">&ldquo;{r.text}&rdquo;</p>
                  </div>
                ))}
              </div>

              {/* FAQs */}
              {content?.faqs && (
                <>
                  <h3 className="rd-sub-heading" style={{ marginTop: "40px" }}>Frequently Asked Questions</h3>
                  <div className="rd-faqs">
                    {content.faqs.map((faq, i) => (
                      <div key={i} className={`rd-faq-item${openFaq === i ? " rd-faq-open" : ""}`}>
                        <button className="rd-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                          <span>{faq.q}</span>
                          <span className="rd-faq-arrow">{openFaq === i ? "▲" : "▼"}</span>
                        </button>
                        {openFaq === i && (
                          <div className="rd-faq-a"><p>{faq.a}</p></div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Other vehicles internal linking */}
              <h3 className="rd-sub-heading" style={{ marginTop: "40px" }}>Other Available Vehicles</h3>
              <div className="vd-routes-grid">
                {Object.entries(VEHICLE_CONTENT)
                  .filter(([s]) => s !== slug)
                  .map(([s, v]) => (
                    <Link key={s} to={`/vehicles/${s}`} className="rd-link-card">
                      <span className="rd-link-route">{v.emoji} {v.displayName}</span>
                      <span className="rd-link-arrow">→</span>
                    </Link>
                  ))}
              </div>

            </div>

            {/* SIDEBAR */}
            <div className="rd-sidebar">
              <div className="rd-book-card">
                <h3>Book {displayName}</h3>
                <p>Get instant confirmation. Call or WhatsApp now.</p>
                <a href={`tel:${PHONE}`} className="btn btn-accent" style={{ width: "100%", justifyContent: "center", marginBottom: "12px" }}>
                  📞 {PHONE_DISPLAY}
                </a>
                <a href={bookMsg} target="_blank" rel="noreferrer" className="btn btn-whatsapp" style={{ width: "100%", justifyContent: "center" }}>
                  <img src={whatsappIcon} alt="WhatsApp" style={{ width: "18px", height: "18px", objectFit: "contain" }} /> WhatsApp Us
                </a>
                <div className="rd-book-note"><span>🕐</span> Available 24/7 · Instant Booking</div>
              </div>

              <div className="rd-summary-card">
                <h4>Vehicle Summary</h4>
                <div className="rd-summary-row"><span>Type</span><strong>{displayName}</strong></div>
                <div className="rd-summary-row"><span>Capacity</span><strong>{capacity}</strong></div>
                <div className="rd-summary-row"><span>AC</span><strong>{content?.ac ?? vehicle?.hasAC ? "Yes" : "No"}</strong></div>
                <div className="rd-summary-row"><span>Luggage</span><strong>{content?.luggage || "Standard"}</strong></div>
                <div className="rd-summary-row"><span>Trip Options</span><strong>One Way &amp; Round Trip</strong></div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
