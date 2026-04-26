import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Helmet } from "react-helmet-async";
import whatsappIcon from "../Assets/WhatsApp_icon.png";
import { db } from "../firebase";
import bgIMG from "../Assets/bgIMG.jpg";
import "./Services.css";

function Services() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const vehicleCategories = [
    {
      name: "Volvo Bus",
      icon: "🚌",
      description: "TheKalkaTravels is the best and affordable bus service.",
    },
    {
      name: "Bus",
      icon: "🚐",
      description: "TheKalkaTravels is the best and affordable bus service.",
    },
    {
      name: "Urbania Traveller",
      icon: "🚐",
      description: "TheKalkaTravels is the best and affordable cab service.",
    },
    {
      name: "Traveller",
      icon: "🚐",
      description: "TheKalkaTravels is the best and affordable cab service.",
    },
    {
      name: "Etios",
      icon: "🚗",
      description: "TheKalkaTravels is the best and affordable cab service.",
    },
    {
      name: "Dzire",
      icon: "🚗",
      description: "TheKalkaTravels is the best and affordable cab service.",
    },
    {
      name: "Innova",
      icon: "🚙",
      description: "TheKalkaTravels is the best and affordable cab service.",
    },
    {
      name: "Innova Crysta",
      icon: "🚙",
      description: "TheKalkaTravels is the best and affordable cab service.",
    },
    {
      name: "HyCross",
      icon: "🚙",
      description: "TheKalkaTravels is the best and affordable cab service.",
    },
    {
      name: "Ertiga",
      icon: "🚐",
      description: "TheKalkaTravels is the best and affordable cab service.",
    },
  ];

  const servicesList = [
    {
      title: "Pick & Drop Service",
      image: "👔",
      description:
        "We provides for pick & drop service facility to their customers. Whereby the customer can take the car and roam out of town. Outstation usage is for Family day out, small trip etc. We provide services at affordable prices.",
    },
    {
      title: "Outstation Taxi Service",
      image: "🧑",
      description:
        "Cab and taxi service providers are essential for tourists and their traveling needs. Outstation Taxi service can book a cab and go for an outstation ride. Book a taxi and get away from your day-to-day corporate lifestyle.",
    },
    {
      title: "Tour Packages",
      image: "👥",
      description:
        "Standard and customised packages all tailored to your travel needs. We are always pro in offering you what you want at the best price. Below listed Taxi packages starts its journey from the Mohali city.",
    },
  ];

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const snapshot = await getDocs(collection(db, "vehicles"));
        if (snapshot.empty) {
          setVehicles(vehicleCategories);
        } else {
          setVehicles(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        }
      } catch (err) {
        console.warn("Failed to load vehicles from Firebase", err);
        setVehicles(vehicleCategories);
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, []);

  const phoneNumber = "919815948989";

  return (
    <div className="services-container">
      <Helmet>
        <title>Services & Fleet — TheKalkaTravels | Sedan, SUV, Innova, Tempo</title>
        <meta name="description" content="Book Sedan, SUV, Innova Crysta, Tempo Traveller and Volvo Bus from TheKalkaTravels. Outstation taxi, pick & drop, and tour packages across North India." />
        <link rel="canonical" href="https://thekalkatravels.com/services" />
      </Helmet>
      {/* HERO SECTION */}
      <section className="services-hero" style={{ backgroundImage: `url(${bgIMG})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="section-tag" style={{ background: "rgba(249,115,22,0.2)", color: "#fdba74", border: "1px solid rgba(249,115,22,0.4)", marginBottom: "16px", display: "inline-block" }}>Services</span>
          <h1>Our Services & Fleet</h1>
          <p>Premium Travel Solutions for Every Journey</p>
        </div>
      </section>

      {/* AVAILABLE CAR SERVICES */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Available Car Services</h2>
            <p className="section-desc">Choose from our wide range of well-maintained vehicles</p>
            <div className="section-underline"></div>
          </div>

          <div className="vehicles-grid">
            {(loading ? vehicleCategories : vehicles).map((vehicle, index) => (
              <div key={index} className="vehicle-card">
                <div className="vehicle-image-placeholder">
                  {vehicle.imageUrl ? (
                    <img
                      src={vehicle.imageUrl}
                      alt={vehicle.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }}
                      onError={e => { e.target.style.display = "none"; e.target.parentElement.innerHTML = "<span class='vehicle-icon'>🚗</span>"; }}
                    />
                  ) : vehicle.image && vehicle.image.startsWith("http") ? (
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }}
                      onError={e => { e.target.style.display = "none"; e.target.parentElement.innerHTML = "<span class='vehicle-icon'>🚗</span>"; }}
                    />
                  ) : (
                    <span className="vehicle-icon">{vehicle.icon || "🚗"}</span>
                  )}
                </div>
                <h3 className="vehicle-name">{vehicle.name}</h3>
                <p className="vehicle-description">
                  {vehicle.description || vehicle.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIAL SERVICES */}
      <section className="special-services-section">
        <div className="container">
          <div className="section-header white-header">
            <h2 className="section-title">Special Services</h2>
            <p className="section-desc">Premium travel solutions for special occasions</p>
            <div className="section-underline"></div>
          </div>

          <div className="special-services-grid">
            <div className="special-service-item">
              <div className="item-header">
                <h3>🚗 Delhi To Chandigarh Pick & Drop</h3>
              </div>
              <table className="special-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Vehicle Name</th>
                    <th>Price (₹)</th>
                    <th>Extra Charges</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Small Car</td>
                    <td className="price">₹3,500</td>
                    <td>Toll + Parking</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Ertiga</td>
                    <td className="price">₹4,500</td>
                    <td>Toll + Parking</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Innova</td>
                    <td className="price">₹5,500</td>
                    <td>Toll + Parking</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Innova Hycross</td>
                    <td className="price">₹7,500</td>
                    <td>Toll + Parking</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Tempo Traveller</td>
                    <td className="price">₹14,000</td>
                    <td>Toll + Parking</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Urbania</td>
                    <td className="price">₹18,000</td>
                    <td>Toll + Parking</td>
                  </tr>
                </tbody>
              </table>

              <div className="service-note">✓ Self Driven Car also Available</div>
            </div>

            <div className="special-service-item">
              <div className="item-header">
                <h3>💒 Car Available For Doli</h3>
              </div>
              <div className="doli-image">
                <div className="doli-placeholder">
                  <span style={{ fontSize: "80px" }}>🚗</span>
                </div>
                <p className="car-type">Mercedes | Audi | BMW</p>
              </div>
              <p className="doli-desc">Premium luxury vehicles for your special day</p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN SERVICES */}
      <section className="main-services-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Our Services?</h2>
            <p className="section-desc">Best travel experience with professional service</p>
            <div className="section-underline"></div>
          </div>

          <div className="services-cards-grid">
            {servicesList.map((service, index) => (
              <div key={index} className="main-service-card">
                <div className="service-image-wrapper">
                  <div className="service-image">{service.image}</div>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>

          {/* CTA BANNER */}
          <div className="cta-banner">
            <div className="banner-content">
              <h2>🚀 Ready for Your Next Journey?</h2>
              <p>
                Professional Drivers • Safe Vehicles • Best Prices
              </p>
              <div className="banner-buttons">
                <a
                  href={`https://wa.me/${phoneNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp"
                >
                  <img src={whatsappIcon} alt="WhatsApp" style={{ width: "18px", height: "18px", objectFit: "contain" }} /> WhatsApp Now
                </a>
                <a href={`tel:${phoneNumber}`} className="btn btn-call">
                  📞 Call Us Today
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-choose-section">
        <div className="container">
          <div className="section-header white-header">
            <h2 className="section-title">Why Choose TheKalkaTravels</h2>
            <p className="section-desc">Your trusted travel partner since 1999</p>
            <div className="section-underline"></div>
          </div>

          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">🎯</div>
              <h3>Professional & Experienced</h3>
              <p>Trained drivers with years of experience in safe, courteous travel service</p>
            </div>
            <div className="why-card">
              <div className="why-icon">🔒</div>
              <h3>Safety First</h3>
              <p>Well-maintained vehicles with all safety features and insurance coverage</p>
            </div>
            <div className="why-card">
              <div className="why-icon">💰</div>
              <h3>Transparent Pricing</h3>
              <p>No hidden charges - get competitive rates with clear cost breakdown</p>
            </div>
            <div className="why-card">
              <div className="why-icon">⏰</div>
              <h3>Available 24/7</h3>
              <p>Round-the-clock booking and customer support for your convenience</p>
            </div>
            <div className="why-card">
              <div className="why-icon">🌍</div>
              <h3>All India Permits</h3>
              <p>Vehicles equipped with all-India permits for seamless travel anywhere</p>
            </div>
            <div className="why-card">
              <div className="why-icon">⭐</div>
              <h3>Customer Satisfaction</h3>
              <p>Rated 5-stars by thousands of happy customers across India</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
