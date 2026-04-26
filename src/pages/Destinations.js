import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Helmet } from "react-helmet-async";
import { db } from "../firebase";
import bgIMG from "../Assets/bgIMG.jpg";
import whatsappIcon from "../Assets/WhatsApp_icon.png";
import "./Destinations.css";

const PHONE = "919815948989";

const fallbackDestinations = [
  { name: "Chandigarh", desc: "The City Beautiful — clean, planned, and vibrant.", imageUrl: "https://images.unsplash.com/photo-1595928642581-f50f4f3453a5?auto=format&fit=crop&w=800&q=75" },
  { name: "Delhi", desc: "India's capital — history, culture, and modernity.", imageUrl: "https://images.unsplash.com/photo-1587474260584-1f20d4296c06?auto=format&fit=crop&w=800&q=75" },
  { name: "Jaipur", desc: "The Pink City of Rajasthan — forts and palaces.", imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=75" },
  { name: "Agra", desc: "Home of the iconic Taj Mahal — a wonder of the world.", imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea023?auto=format&fit=crop&w=800&q=75" },
  { name: "Amritsar", desc: "The Golden Temple City — spiritual and serene.", imageUrl: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=800&q=75" },
  { name: "Shimla", desc: "Queen of Hills — colonial charm and mountain views.", imageUrl: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&w=800&q=75" },
  { name: "Manali", desc: "Snow, adventure, and breathtaking Himalayan scenery.", imageUrl: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=800&q=75" },
  { name: "Dharamshala", desc: "Peace, Tibetan culture, and stunning mountain views.", imageUrl: "https://images.unsplash.com/photo-1582211594533-268f4f1edeb9?auto=format&fit=crop&w=800&q=75" },
];

function DestinationCard({ place, index }) {
  return (
    <div className="destination-card">
      <div className="destination-card-image">
        {place.imageUrl ? (
          <img
            src={place.imageUrl}
            alt={place.name}
            loading="lazy"
            onError={e => { e.target.src = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=75"; }}
          />
        ) : (
          <div className="dest-img-placeholder">📍</div>
        )}
        <div className="destination-card-overlay">
          <a href={`https://wa.me/${PHONE}?text=I want to book a trip to ${place.name}`} target="_blank" rel="noreferrer" className="dest-book-btn">
            Book Trip →
          </a>
        </div>
      </div>
      <div className="destination-card-content">
        <h3>{place.name}</h3>
        <p>{place.desc}</p>
        <div className="destination-card-footer">
          <span className="destination-card-badge">📍 {place.name}</span>
          <a href={`https://wa.me/${PHONE}?text=Book trip to ${place.name}`} target="_blank" rel="noreferrer" className="dest-enquire">Enquire →</a>
        </div>
      </div>
    </div>
  );
}

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const snapshot = await getDocs(collection(db, "destinations"));
        setDestinations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.warn("Failed to load destinations", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const items = destinations.length ? destinations : fallbackDestinations;

  return (
    <div className="destinations-container">
      <Helmet>
        <title>Destinations — TheKalkaTravels | Shimla, Manali, Delhi & More</title>
        <meta name="description" content="Explore popular destinations covered by TheKalkaTravels — Shimla, Manali, Dharamshala, Dalhousie, Amritsar, Delhi and more. Book your cab today." />
        <link rel="canonical" href="https://thekalkatravels.com/destinations" />
      </Helmet>
      {/* Hero */}
      <section className="destinations-hero" style={{ backgroundImage: `url(${bgIMG})` }}>
        <div className="destinations-hero-overlay" />
        <div className="destinations-hero-content">
          <span className="section-tag" style={{ background: "rgba(249,115,22,0.2)", color: "#fdba74", border: "1px solid rgba(249,115,22,0.4)" }}>Explore</span>
          <h1>Popular Destinations</h1>
          <p>Discover amazing places across North India with our reliable taxi services</p>
        </div>
      </section>

      {/* Content */}
      <section className="destinations-content">
        <div className="destinations-header">
          <span className="section-tag">Our Coverage</span>
          <h2>Destinations We Cover</h2>
          <p>Comfortable & reliable taxi services to all major tourist locations</p>
          <div className="section-underline" />
        </div>

        {loading ? (
          <div className="destinations-loading">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="dest-skeleton" />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="destinations-grid">
            {items.map((place, index) => (
              <DestinationCard key={place.id ?? index} place={place} index={index} />
            ))}
          </div>
        ) : (
          <div className="destinations-empty">
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>🗺️</div>
            <h3>No destinations available</h3>
            <p>Check back soon for amazing travel destinations!</p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="destinations-cta">
        <div className="destinations-cta-inner">
          <h2>Can't Find Your Destination?</h2>
          <p>We cover all major cities and tourist spots across North India. Contact us for custom routes.</p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`tel:${PHONE}`} className="btn btn-accent">📞 Call Us</a>
            <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noreferrer" className="btn btn-whatsapp"><img src={whatsappIcon} alt="WhatsApp" style={{ width: "18px", height: "18px", objectFit: "contain" }} /> WhatsApp</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Destinations;
