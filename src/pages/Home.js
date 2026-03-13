import bgIMG from "../Assets/bgIMG.jpg";

function Home() {
  const phoneNumber = "918894437637";

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
      <section className="container">
        <h2 className="center">Popular Destinations</h2>

        <div className="grid">
          {[
            "Chandigarh",
            "Shimla",
            "Manali",
            "Dalhousie",
            "Dharamshala",
            "Spiti Valley",
            "Amritsar",
            "Delhi",
          ].map((place, i) => (
            <div key={i} className="destination-card">
              📍 {place}
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta">
        <h2>Plan Your Journey Today</h2>
        <p>Call or WhatsApp us for instant booking & best deals</p>

        <a href={`tel:${phoneNumber}`} className="btn btn-call">
          📞 Book Now
        </a>
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