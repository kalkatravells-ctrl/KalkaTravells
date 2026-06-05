import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import bgIMG from "../Assets/bgIMG.jpg";
import whatsappIcon from "../Assets/WhatsApp_icon.png";
import "./About.css";

const PHONE = "919815948989";

const TEAM_VALUES = [
  { icon: "🎯", title: "Our Mission", desc: "To provide safe, comfortable, and affordable travel experiences across North India with professional drivers and well-maintained vehicles." },
  { icon: "👁️", title: "Our Vision", desc: "To become the most trusted travel partner in Himachal Pradesh and North India, known for reliability, safety, and exceptional service." },
  { icon: "💎", title: "Our Values", desc: "Integrity, safety, punctuality, and customer satisfaction are the pillars that drive everything we do at TheKalkaTravels." },
];

const MILESTONES = [
  { year: "1999", event: "Founded in Chandigarh" },
  { year: "2005", event: "Expanded to 20+ vehicles" },
  { year: "2012", event: "Launched outstation services" },
  { year: "2018", event: "10,000+ happy customers" },
  { year: "2022", event: "All India permit fleet" },
  { year: "2024", event: "Digital booking platform" },
];

const FEATURES = [
  { icon: "🚗", title: "Modern Fleet", desc: "50+ well-maintained vehicles from sedans to luxury SUVs" },
  { icon: "👨‍✈️", title: "Expert Drivers", desc: "Trained, verified, and courteous professional drivers" },
  { icon: "🛡️", title: "Fully Insured", desc: "All vehicles are fully insured for your peace of mind" },
  { icon: "📍", title: "GPS Tracked", desc: "Real-time tracking for safety and transparency" },
  { icon: "💰", title: "Fair Pricing", desc: "Transparent pricing with no hidden charges ever" },
  { icon: "⭐", title: "5-Star Rated", desc: "Consistently rated 5 stars by thousands of customers" },
];

function About() {
  return (
    <div className="about-page">
      <Helmet>
        <title>About Us — TheKalkaTravels | Trusted Since 1999</title>
        <meta name="description" content="TheKalkaTravels has been providing reliable taxi and tour services from Chandigarh since 1999. Learn about our fleet, drivers, and commitment to safe travel across North India." />
        <link rel="canonical" href="https://thekalkatravels.com/about" />
      </Helmet>
      {/* Hero */}
      <section className="about-hero" style={{ backgroundImage: `url(${bgIMG})` }}>
        <div className="about-hero-overlay" />
        <div className="about-hero-content">
          <span className="section-tag" style={{ background: "rgba(249,115,22,0.2)", color: "#fdba74", border: "1px solid rgba(249,115,22,0.4)" }}>About Us</span>
          <h1>25+ Years of Trusted Travel</h1>
          <p>From a small taxi service in Chandigarh to North India's most trusted travel partner — our journey is built on trust, safety, and a passion for travel.</p>
        </div>
      </section>

      {/* Story */}
      <section className="section about-story-section">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-text">
              <span className="section-tag">Our Story</span>
              <h2 className="section-title" style={{ textAlign: "left" }}>Born in the Hills of Himachal</h2>
              <p>TheKalkaTravels was founded in 1999 in Chandigarh, Punjab. What started as a small taxi service with just 2 vehicles has grown into a full-fledged travel company with a fleet of 50+ vehicles.</p>
              <p style={{ marginTop: "16px" }}>Over the past 25 years, we have served thousands of families, corporate clients, and tourists — helping them explore the beautiful landscapes of Himachal Pradesh, Punjab, Haryana, and beyond.</p>
              <p style={{ marginTop: "16px" }}>Our commitment to safety, punctuality, and customer satisfaction has made us the go-to travel partner for people across North India.</p>
              <div style={{ marginTop: "28px", display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <a href={`tel:${PHONE}`} className="btn btn-primary">📞 Call Us</a>
                <Link to="/services" className="btn btn-outline" style={{ color: "var(--dark-light)", border: "2px solid var(--gray-300)" }}>Our Services →</Link>
              </div>
            </div>
            <div className="about-milestones">
              <h3 className="about-milestones-title">Our Journey</h3>
              <div className="timeline">
                {MILESTONES.map((m, i) => (
                  <div key={i} className="timeline-item">
                    <div className="timeline-year">{m.year}</div>
                    <div className="timeline-dot" />
                    <div className="timeline-event">{m.event}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="section about-mvv-section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "48px" }}>
            <span className="section-tag">What Drives Us</span>
            <h2 className="section-title">Mission, Vision & Values</h2>
          </div>
          <div className="about-mvv-grid">
            {TEAM_VALUES.map((v, i) => (
              <div key={i} className="mvv-card">
                <div className="mvv-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section about-features-section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "48px" }}>
            <span className="section-tag">What We Offer</span>
            <h2 className="section-title">Why We Stand Out</h2>
            <p className="section-desc">Every detail is designed to make your journey safe, comfortable, and memorable</p>
          </div>
          <div className="about-features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="about-feature-card">
                <div className="about-feature-icon">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta-section">
        <div className="container">
          <div className="about-cta-box">
            <h2>Ready to Travel with Us?</h2>
            <p>Join thousands of happy customers who trust TheKalkaTravels for their journeys</p>
            <div className="about-cta-btns">
              <a href={`tel:${PHONE}`} className="btn btn-accent">📞 Book Now</a>
              <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noreferrer" className="btn btn-whatsapp"><img src={whatsappIcon} alt="WhatsApp" style={{ width: "18px", height: "18px", objectFit: "contain" }} /> WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
