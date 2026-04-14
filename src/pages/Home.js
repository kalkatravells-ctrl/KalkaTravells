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
      { name: "Chandigarh" },
      { name: "Shimla" },
      { name: "Manali" },
      { name: "Dalhousie" },
      { name: "Dharamshala" },
      { name: "Spiti Valley" },
      { name: "Amritsar" },
      { name: "Delhi" },
    ];

  return (
    <>
      {/* HERO SECTION WITH BOOKING FORM */}
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
          <h1>Book Your Perfect Ride with TheKalkaTravels</h1>
          
          <div className="booking-container">
            <div className="booking-tabs">
              <div className="tab active">Outstation</div>
              <div className="tab">Airport Transfer</div>
              <div className="tab">Local</div>
            </div>

            <form className="booking-form" onSubmit={(e) => e.preventDefault()}>
              <div className="input-group">
                <label>From</label>
                <input type="text" placeholder="Enter Source" defaultValue="Kalka" />
              </div>
              <div className="input-group">
                <label>To</label>
                <input type="text" placeholder="Enter Destination" />
              </div>
              <div className="input-group">
                <label>Pick-Up Date</label>
                <input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <button type="submit" className="btn-search">SEARCH</button>
            </form>
          </div>
        </div>
      </section>

      {/* VEHICLE OPTIONS SECTION */}
      <section className="vehicle-section section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Available Cabs</h2>
            <p className="section-subtitle">Choose from our wide range of well-maintained vehicles</p>
          </div>

          <div className="vehicle-list">
            {/* Sedan Option */}
            <div className="vehicle-card">
              <div className="vehicle-img">
                <img src="https://img.freepik.com/free-photo/white-offroader-jeep-parking_114579-4007.jpg?t=st=1711255000~exp=1711258600~hmac=5c6" alt="Sedan" />
              </div>
              <div className="vehicle-details">
                <h3>Dzire, Etios Or Equivalent</h3>
                <div className="vehicle-specs">
                  <span>Sedan</span>
                  <span>• 4 Seat</span>
                  <span>• 2 Luggage</span>
                  <span>• AC</span>
                </div>
                <div className="vehicle-features">
                  <div className="feature-item">✓ Professional Driver</div>
                  <div className="feature-item">✓ Fuel Type: CNG/Diesel</div>
                  <div className="feature-item">✓ Cancellation Policy: Free</div>
                  <div className="feature-item">✓ 24/7 Support</div>
                </div>
              </div>
              <div className="vehicle-price-action">
                <div className="price">₹ 2,499</div>
                <p className="price-desc">Taxes & Charges extra</p>
                <a href={`tel:${phoneNumber}`} className="btn-book">Book Now</a>
              </div>
            </div>

            {/* SUV Option */}
            <div className="vehicle-card">
              <div className="vehicle-img">
                <img src="https://img.freepik.com/free-photo/silver-luxury-suv-car-parking_114579-4005.jpg" alt="SUV" />
              </div>
              <div className="vehicle-details">
                <h3>Innova, Ertiga Or Equivalent</h3>
                <div className="vehicle-specs">
                  <span>SUV</span>
                  <span>• 6 Seat</span>
                  <span>• 3 Luggage</span>
                  <span>• AC</span>
                </div>
                <div className="vehicle-features">
                  <div className="feature-item">✓ Extra Legroom</div>
                  <div className="feature-item">✓ Fuel Type: Diesel</div>
                  <div className="feature-item">✓ Cancellation Policy: Free</div>
                  <div className="feature-item">✓ Professional Driver</div>
                </div>
              </div>
              <div className="vehicle-price-action">
                <div className="price">₹ 3,850</div>
                <p className="price-desc">Taxes & Charges extra</p>
                <a href={`tel:${phoneNumber}`} className="btn-book">Book Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="benefits-section section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Benefits of Booking with Us</h2>
          </div>
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">💳</div>
              <h4>Part Payment</h4>
              <p>Book by paying just 25% now and rest to the driver.</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">📅</div>
              <h4>Schedule Advance</h4>
              <p>Book your ride in advance for a hassle-free journey.</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🛡️</div>
              <h4>Safe Journey</h4>
              <p>Verified drivers and well-maintained vehicles.</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">📞</div>
              <h4>24/7 Support</h4>
              <p>Our team is always available to assist you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ROUTE DETAILS SECTION */}
      <section className="route-section section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Route Details</h2>
          </div>
          <div className="route-table">
            <div className="table-header">
              <div>Journey Insight</div>
              <div>Details</div>
            </div>
            <div className="table-row">
              <div>Popular Route</div>
              <div>Kalka to Shimla / Manali</div>
            </div>
            <div className="table-row">
              <div>Average Distance</div>
              <div>~90 KM (Shimla)</div>
            </div>
            <div className="table-row">
              <div>Estimated Time</div>
              <div>~3 Hours</div>
            </div>
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