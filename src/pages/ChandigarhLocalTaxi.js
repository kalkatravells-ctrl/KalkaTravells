import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import whatsappIcon from "../Assets/WhatsApp_icon.png";
import bgIMG from "../Assets/bgIMG.jpg";
import { getVehicles } from "../firebase/vehicles";
import { trackGoogleAdsConversion, GOOGLE_ADS_CONFIG } from "../utils/googleAds";
import "./ChandigarhLocalTaxi.css";

function ChandigarhLocalTaxi() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [currentRouteIndex, setCurrentRouteIndex] = useState(0);
  const [vehicles, setVehicles] = useState([]);

  const phoneNumber = "919815948989";
  const PHONE = "919815948989";
  const PHONE_DISPLAY = "+91 98159 48989";

  const handlePhoneClick = (e) => {
    trackGoogleAdsConversion(GOOGLE_ADS_CONFIG.customerId, GOOGLE_ADS_CONFIG.phoneConversionLabel);
  };

  const handleWhatsAppClick = (e) => {
    trackGoogleAdsConversion(GOOGLE_ADS_CONFIG.customerId, GOOGLE_ADS_CONFIG.whatsappConversionLabel);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRouteIndex((prev) => (prev + 1) % popularRoutes.length);
    }, 3000); // Change route every 3 seconds
    return () => clearInterval(interval);
  }, []);

  // Load vehicles from Firebase
  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const data = await getVehicles();
        setVehicles(data);
      } catch (err) {
        console.warn("Failed to load vehicles", err);
        setVehicles([]);
      }
    };
    loadVehicles();
  }, []);

  // Why Choose Us Cards
  const whyChooseCards = [
    {
      icon: "👨",
      title: "Professional Drivers",
      description: "Trained, courteous, and experienced drivers for safe travel"
    },
    {
      icon: "❄️",
      title: "AC Cars",
      description: "All vehicles equipped with air conditioning for comfort"
    },
    {
      icon: "💰",
      title: "Affordable Rates",
      description: "Competitive pricing with no hidden charges"
    },
    {
      icon: "⏰",
      title: "24/7 Service",
      description: "Round-the-clock taxi availability for your convenience"
    },
    {
      icon: "✨",
      title: "Clean Vehicles",
      description: "Well-maintained and hygienic vehicles"
    },
    {
      icon: "⚡",
      title: "Instant Booking",
      description: "Quick and easy taxi booking process"
    }
  ];

  // Local Taxi Services
  const localServices = [
    { icon: "🏙️", title: "City Tour", description: "Explore Chandigarh with professional drivers" },
    { icon: "🛍️", title: "Shopping", description: "Shopping mall and market trips" },
    { icon: "💼", title: "Office Pickup", description: "Daily office commute services" },
    { icon: "🏨", title: "Hotel Pickup", description: "Hotel to destination transfers" },
    { icon: "✈️", title: "Airport Drop", description: "Airport transfers with on-time guarantee" },
    { icon: "🚆", title: "Railway Station Pickup", description: "ISBT and railway station transfers" }
  ];

  // Popular Routes in Chandigarh
  const popularRoutes = [
    "Chandigarh → Sector 17",
    "Chandigarh → Elante Mall",
    "Chandigarh → PGI",
    "Chandigarh → ISBT",
    "Chandigarh → Railway Station",
    "Chandigarh → Airport",
    "Chandigarh → IT Park",
    "Chandigarh → Rock Garden",
    "Chandigarh → Sukhna Lake"
  ];

  // Fare Information
  const fareStructure = [
    {
      service: "Local 8 Hours 80 km",
      price: "₹1,799",
      note: "+ TPN"
    },
    {
      service: "Airport Drop & Pickup",
      price: "₹1,199",
      note: ""
    },
    {
      service: "Railway Station Transfer",
      price: "₹999",
      note: "+ TPN"
    },
    {
      service: "Full Day 130 km",
      price: "₹2,499",
      note: "+ TPN"
    }
  ];

  // Places Covered
  const placesCovered = [
    "Sector 17", "Sector 22", "Sector 35", "Sector 43", "Sector 45",
    "Mohali", "Panchkula", "Zirakpur"
  ];

  // Customer Reviews - Enhanced with more data
  const reviews = [
    {
      name: "Rajesh Kumar",
      rating: 5,
      text: "Excellent service! Driver was very professional and the car was clean. Highly recommended!",
      location: "Sector 17"
    },
    {
      name: "Priya Singh",
      rating: 5,
      text: "Best local taxi service in Chandigarh. Affordable rates and punctual service.",
      location: "Sector 22"
    },
    {
      name: "Amit Sharma",
      rating: 5,
      text: "Great experience with airport pickup. No waiting, car was on time. Will book again!",
      location: "Airport"
    },
    {
      name: "Neha Verma",
      rating: 5,
      text: "Very comfortable for city tours. Driver was knowledgeable about local places.",
      location: "Rock Garden"
    },
    {
      name: "Vikram Patel",
      rating: 5,
      text: "Best rates in Chandigarh for 24/7 taxi service. Booking is super easy!",
      location: "Sector 35"
    },
    {
      name: "Deepika Gupta",
      rating: 5,
      text: "Professional drivers and well-maintained vehicles. Perfect for business travel.",
      location: "IT Park"
    }
  ];

  // FAQ
  const faqs = [
    {
      question: "How can I book a taxi?",
      answer: "You can book a taxi by calling us at 9815948989, messaging on WhatsApp, or using our online booking system. Bookings are confirmed within minutes."
    },
    {
      question: "Do you provide airport pickup?",
      answer: "Yes, we provide airport pickup and drop services with guaranteed on-time arrival. Fixed rates available for airport transfers."
    },
    {
      question: "Do you provide late night taxi?",
      answer: "Yes, we operate 24/7. Late night taxis are available at all hours with the same professional service standards."
    },
    {
      question: "Which payment methods are accepted?",
      answer: "We accept Cash, UPI, Card payments, and Digital wallets. Choose your preferred payment method at the time of booking."
    },
    {
      question: "Can I book for full day?",
      answer: "Yes, we offer full-day packages with hourly or per-kilometer options. Contact us for customized packages based on your needs."
    }
  ];

  return (
    <div className="chandigarh-taxi-container">
      <Helmet>
        <title>Chandigarh Local Taxi Service | 24×7 Cab Booking | Affordable Fares</title>
        <meta name="description" content="Book local taxi in Chandigarh - 24/7 affordable cab service, professional drivers, airport transfers, city tours. Call now for instant booking!" />
        <meta name="keywords" content="Chandigarh local taxi, taxi service Chandigarh, cab booking Chandigarh, airport taxi Chandigarh, local taxi Chandigarh, 24x7 taxi Chandigarh" />
        <link rel="canonical" href="https://thekalkatravels.com/chandigarh-local-taxi" />
      </Helmet>

      {/* HERO SECTION */}
      <section className="hero-section" style={{ backgroundImage: `url(${bgIMG})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Chandigarh Local Taxi Service</h1>
          <p className="hero-subtitle">Reliable Local Cabs | 24×7 Service | Affordable Fares</p>
          <div className="hero-buttons">
            <a href={`tel:${phoneNumber}`} className="btn btn-call" onClick={handlePhoneClick}>
              📞 Call Now
            </a>
            <a
              href={`https://wa.me/${phoneNumber}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
              onClick={handleWhatsAppClick}
            >
              <img src={whatsappIcon} alt="WhatsApp" style={{ width: "18px", height: "18px", objectFit: "contain" }} /> WhatsApp
            </a>
          </div>

          {/* POPULAR ROUTES CAROUSEL INSIDE HERO */}
          <div className="hero-carousel-wrapper">
            <div className="hero-carousel">
              {popularRoutes.map((route, idx) => (
                <div
                  key={idx}
                  className={`hero-carousel-item ${idx === currentRouteIndex ? 'active' : ''}`}
                >
                  <h3>{route}</h3>
                </div>
              ))}
            </div>
            <div className="hero-carousel-indicators">
              {popularRoutes.map((_, idx) => (
                <button
                  key={idx}
                  className={`hero-indicator ${idx === currentRouteIndex ? 'active' : ''}`}
                  onClick={() => setCurrentRouteIndex(idx)}
                  aria-label={`Show route ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-choose-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Us?</h2>
            <p>Best Local Taxi Service in Chandigarh</p>
          </div>
          <div className="why-choose-grid">
            {whyChooseCards.map((card, idx) => (
              <div key={idx} className="why-card">
                <div className="why-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR ROUTES CAROUSEL */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Local Taxi Services</h2>
            <p>Wide range of services for all your local travel needs</p>
          </div>
          <div className="services-grid">
            {localServices.map((service, idx) => (
              <div key={idx} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <button className="btn-book-now">Book Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR ROUTES */}
      <section className="routes-section">
        <div className="container">
          <div className="section-header">
            <h2>Chandigarh Popular Routes</h2>
            <p>Quick booking for frequently traveled routes</p>
          </div>
          <div className="routes-grid">
            {popularRoutes.map((route, idx) => (
              <div key={idx} className="route-card">
                <p className="route-name">{route}</p>
                <button className="btn-route-book">Book Now →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLEET SECTION */}
      <section className="fleet-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Fleet</h2>
            <p>Choose from our well-maintained vehicles</p>
          </div>
          {vehicles.length > 0 ? (
            <div className="fleet-grid">
              {vehicles.map((vehicle, idx) => (
                <div key={vehicle.id || idx} className="fleet-card">
                  {vehicle.imageUrl && (
                    <div className="fleet-image-wrap">
                      <img 
                        src={vehicle.imageUrl} 
                        alt={vehicle.name}
                        loading="lazy"
                        onError={e => { e.target.parentElement.style.display = "none"; }}
                      />
                    </div>
                  )}
                  <div className="fleet-icon">{vehicle.icon || "🚗"}</div>
                  <h3>{vehicle.name || vehicle.category}</h3>
                  <div className="fleet-details">
                    {(vehicle.seatingCapacity || vehicle.seats) && (
                      <p>👥 {vehicle.seatingCapacity || vehicle.seats} Seats</p>
                    )}
                    {vehicle.hasAC !== false && <p>❄️ AC</p>}
                    {(vehicle.luggageCapacity || vehicle.luggage) && (
                      <p>🎒 {vehicle.luggageCapacity || vehicle.luggage} Bags</p>
                    )}
                  </div>
                  {vehicle.fuelType && (
                    <p className="fleet-features">⛽ {vehicle.fuelType}</p>
                  )}
                  {vehicle.kmCharges && (
                    <p className="fleet-features">💰 {vehicle.kmCharges}/km</p>
                  )}
                  {vehicle.finalPrice && (
                    <p className="fleet-price">Starting from ₹{vehicle.finalPrice}</p>
                  )}
                  <a 
                    href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(`Hi, I'm interested in booking ${vehicle.name}. Please provide quote and availability.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-fleet-book"
                    onClick={handleWhatsAppClick}
                  >
                    Book Now
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="fleet-empty-state">
              <p>Fleet information is being loaded...</p>
            </div>
          )}
        </div>
      </section>

      {/* FARE SECTION */}
      <section id="booking-section" className="fare-section">
        <div className="container">
          <div className="section-header">
            <h2>⭐ Our Fares</h2>
            <p>Transparent pricing - Starting from ₹999</p>
          </div>
          <div className="fare-grid">
            {fareStructure.map((fare, idx) => (
              <div key={idx} className="fare-card">
                <h4>{fare.service}</h4>
                <div className="fare-price">{fare.price}</div>
                {fare.note && <p className="fare-note">{fare.note}</p>}
                <button className="btn-fare-book">Book Now</button>
              </div>
            ))}
          </div>
          <p className="fare-note-general">💡 *Note: Prices change seasonally. Please call for latest rates.</p>
        </div>
      </section>

      {/* PLACES COVERED */}
      <section className="places-section">
        <div className="container">
          <div className="section-header">
            <h2>Places We Cover</h2>
            <p>Available across Chandigarh and nearby areas</p>
          </div>
          <div className="places-grid">
            {placesCovered.map((place, idx) => (
              <div key={idx} className="place-badge">
                {place}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="reviews-section">
        <div className="container">
          <div className="section-header">
            <h2>⭐⭐⭐⭐⭐ Customer Reviews</h2>
            <p>What our customers say about us</p>
          </div>
          <div className="reviews-grid">
            {reviews.slice(0, visibleReviews).map((review, idx) => (
              <div key={idx} className="review-card">
                <div className="review-header">
                  <div className="review-stars">
                    {"⭐".repeat(review.rating)}
                  </div>
                  {review.location && <span className="review-location">{review.location}</span>}
                </div>
                <p className="review-text">"{review.text}"</p>
                <p className="review-author">— {review.name}</p>
              </div>
            ))}
          </div>
          {visibleReviews < reviews.length && (
            <div className="text-center" style={{ marginTop: "32px" }}>
              <button 
                className="btn btn-primary"
                onClick={() => setVisibleReviews(reviews.length)}
              >
                Load More Reviews →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2>⭐⭐ FAQ</h2>
            <p>Frequently Asked Questions</p>
          </div>
          <div className="faq-container">
            {faqs.map((faq, idx) => (
              <div key={idx} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-toggle">{expandedFaq === idx ? "−" : "+"}</span>
                </button>
                {expandedFaq === idx && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Need a Taxi in Chandigarh?</h2>
            <p>Book now for reliable and affordable local taxi service</p>
            <div className="cta-buttons">
              <a href={`tel:${phoneNumber}`} className="btn btn-call-large" onClick={handlePhoneClick}>
                📞 Call Now
              </a>
              <a
                href={`https://wa.me/${phoneNumber}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp-large"
                onClick={handleWhatsAppClick}
              >
                <img src={whatsappIcon} alt="WhatsApp" style={{ width: "18px", height: "18px", objectFit: "contain" }} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING INFO SECTION */}
      <section className="booking-info-section">
        <div className="container">
          <div className="booking-info-grid">
            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>Call Us</h3>
              <a href={`tel:${phoneNumber}`} onClick={handlePhoneClick}>{PHONE_DISPLAY}</a>
              <p>24/7 availability</p>
            </div>
            <div className="info-card">
              <div className="info-icon">💬</div>
              <h3>WhatsApp</h3>
              <a href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noreferrer" onClick={handleWhatsAppClick}>
                Message us now
              </a>
              <p>Instant response</p>
            </div>
            <div className="info-card">
              <div className="info-icon">⏱️</div>
              <h3>Quick Response</h3>
              <p>Average response time</p>
              <p><strong>Under 5 minutes</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a href={`https://wa.me/${phoneNumber}`} className="whatsapp-float" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" onClick={handleWhatsAppClick}>
        <img src={whatsappIcon} alt="WhatsApp" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
      </a>
    </div>
  );
}

export default ChandigarhLocalTaxi;
