import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import bgIMG from "../Assets/bgIMG.jpg";
import { db } from "../firebase";

function Home() {
  const phoneNumber = "918894437637";
  const [destinations, setDestinations] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(true);

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const snapshot = await getDocs(collection(db, "destinations"));
        setDestinations(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.warn("Failed to load destinations", err);
      }
    };

    loadDestinations();
  }, []);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        setLoadingGallery(true);
        const snapshot = await getDocs(collection(db, "gallery"));
        const images = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setGalleryImages(images.slice(0, 8));
      } catch (err) {
        console.warn("Failed to load gallery", err);
      } finally {
        setLoadingGallery(false);
      }
    };

    loadGallery();
  }, []);

  const displayDestinations = destinations.length
    ? destinations.slice(0, 8)
    : [
      "Chandigarh",
      "Shimla",
      "Manali",
      "Dalhousie",
      "Dharamshala",
      "Spiti Valley",
      "Amritsar",
      "Delhi",
    ];

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="hero"
        style={{
          backgroundImage: `url(${bgIMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>Travel with Comfort & Trust</h1>
          <h2>TheKalkaTravels – Your Reliable Travel Partner</h2>
          <p>
            Taxi services, tour packages & outstation trips across North India
            with professional drivers.
          </p>

          <div className="hero-buttons">
            <a href={`tel:${phoneNumber}`} className="btn btn-call">
              📞 Call Now
            </a>

            <a
              href={`https://wa.me/${phoneNumber}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-section">
        <div className="container">

          <h2 className="center">Why Choose TheKalkaTravels?</h2>

          <p className="section-subtitle">
            Trusted taxi service for comfortable journeys across Himachal & North India.
          </p>

          <div className="features-grid">

            <div className="feature-card">
              <div className="feature-icon">🚖</div>
              <h3>Comfortable Vehicles</h3>
              <p>Clean, well-maintained cars with AC and spacious seating.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🧑‍✈️</div>
              <h3>Professional Drivers</h3>
              <p>Experienced drivers who know local routes and ensure safe travel.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Fair Pricing</h3>
              <p>No hidden charges — transparent and affordable fares.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🕒</div>
              <h3>24×7 Service</h3>
              <p>Book your taxi anytime for airport pickup or long trips.</p>
            </div>

          </div>

        </div>
      </section>

      {/* SERVICES */}
      <section className="light-section">
        <div className="container">
          <h2 className="center">Our Services</h2>

          <div className="grid">
            <div className="service-card">🚖 Local Taxi</div>
            <div className="service-card">🛣 Outstation Trips</div>
            <div className="service-card">🏔 Himachal Tour Packages</div>
            <div className="service-card">🚐 Tempo Traveller</div>
            <div className="service-card">✈ Airport Pickup</div>
            <div className="service-card">🕉 Char Dham Yatra</div>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="destinations-section">
        <div className="container">
          <h2 className="center">Popular Destinations</h2>

          <div className="grid">
            {displayDestinations.map((place, i) => (
              <div key={i} className="destination-card">
                📍 {typeof place === "string" ? place : place.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="gallery-section">
        <div className="container">
          <h2 className="center">✨ Our Gallery</h2>
          <div className="gallery-divider"></div>

          {loadingGallery ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <p style={{ fontSize: "18px", color: "#64748b" }}>Loading gallery images...</p>
            </div>
          ) : galleryImages.length > 0 ? (
            <div className="gallery-grid">
              {galleryImages.map((image, index) => (
                <div key={image.id || index} className="gallery-item">
                  <img
                    src={image.url}
                    alt={image.name || `Gallery ${index + 1}`}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <p style={{ fontSize: "18px", color: "#64748b" }}>
                No gallery images yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* OUR REGULAR ROUTES */}
      <section className="routes-section">
        <div className="container">
          <h2 className="center" style={{ color: "white" }}>Our Regular Routes</h2>

          <div className="routes-grid">
            <div className="route-item">
              <span>✓</span> Chandigarh To Delhi
            </div>
            <div className="route-item">
              <span>✓</span> Delhi To Chandigarh
            </div>
            <div className="route-item">
              <span>✓</span> Chandigarh To Manali
            </div>
            <div className="route-item">
              <span>✓</span> Chandigarh To Noida
            </div>
            <div className="route-item">
              <span>✓</span> Noida To Chandigarh
            </div>
            <div className="route-item">
              <span>✓</span> Chandigarh To Dharamshala
            </div>
            <div className="route-item">
              <span>✓</span> Chandigarh To Gurugram
            </div>
            <div className="route-item">
              <span>✓</span> Gurugram To Chandigarh
            </div>
            <div className="route-item">
              <span>✓</span> Chandigarh To Shimla
            </div>
            <div className="route-item">
              <span>✓</span> Chandigarh To Faridabad
            </div>
            <div className="route-item">
              <span>✓</span> Faridabad To Chandigarh
            </div>
            <div className="route-item">
              <span>✓</span> Delhi To Amritsar
            </div>
            <div className="route-item">
              <span>✓</span> Amritsar To Chandigarh
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta">
        <h2>Plan Your Journey Today</h2>
        <p>Call or WhatsApp us for instant booking & best deals</p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <a href={`tel:${phoneNumber}`} className="btn btn-call">
            📞 Book Now
          </a>

          <a
            href={`https://wa.me/${phoneNumber}`}
            className="btn btn-whatsapp"
            target="_blank"
            rel="noreferrer"
          >
            💬 WhatsApp
          </a>

          <Link to="/admin" className="btn" style={{ background: "#64748b" }}>
            🔒 Admin Login
          </Link>
        </div>
      </section>

      {/* FLOATING WHATSAPP */}
      <a
        href={`https://wa.me/${phoneNumber}`}
        className="whatsapp-float"
        target="_blank"
        rel="noreferrer"
      >
        💬
      </a>
    </>
  );
}

export default Home;