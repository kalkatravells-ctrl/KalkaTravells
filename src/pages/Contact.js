import { Helmet } from "react-helmet-async";
import bgIMG from "../Assets/bgIMG.jpg";
import whatsappIcon from "../Assets/WhatsApp_icon.png";
import { trackGoogleAdsConversion, GOOGLE_ADS_CONFIG } from "../utils/googleAds";
import "./Contact.css";

const PHONE = "919815948989";
const PHONE_DISPLAY = "+91 98159 48989";

const CONTACT_CARDS = [
  {
    icon: "📞",
    title: "Call Us",
    subtitle: "Available 24/7",
    value: PHONE_DISPLAY,
    action: `tel:${PHONE}`,
    actionLabel: "Call Now",
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    icon: "whatsapp",
    title: "WhatsApp",
    subtitle: "Quick Response",
    value: PHONE_DISPLAY,
    action: `https://wa.me/${PHONE}`,
    actionLabel: "Chat Now",
    color: "#16a34a",
    bg: "#f0fdf4",
    external: true,
  },
  {
    icon: "📍",
    title: "Our Location",
    subtitle: "Visit Us",
    value: "Chandigarh, Punjab, India",
    action: "https://maps.google.com/?q=Chandigarh,Punjab,India",
    actionLabel: "Get Directions",
    color: "#dc2626",
    bg: "#fef2f2",
    external: true,
  },
  {
    icon: "📧",
    title: "Email Us",
    subtitle: "We reply within 24hrs",
    value: "kalkatravells@gmail.com",
    action: "mailto:kalkatravells@gmail.com",
    actionLabel: "Send Email",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
];

const FAQS = [
  { q: "How do I book a cab?", a: "Simply call or WhatsApp us at +91 88944 37637. We'll confirm your booking instantly." },
  { q: "Do you offer outstation services?", a: "Yes! We cover all major destinations across North India including Shimla, Manali, Delhi, Amritsar, and more." },
  { q: "What vehicles are available?", a: "We have Sedan (Dzire/Etios), SUV (Innova/Ertiga), Innova Crysta, Tempo Traveller, and Volvo Bus." },
  { q: "Is advance booking available?", a: "Yes, you can book in advance. We recommend booking at least 24 hours ahead for outstation trips." },
  { q: "Are there any hidden charges?", a: "No hidden charges. We provide transparent pricing upfront. Toll and parking charges are extra and communicated beforehand." },
];

function Contact() {
  const handlePhoneClick = (e) => {
    trackGoogleAdsConversion(GOOGLE_ADS_CONFIG.customerId, GOOGLE_ADS_CONFIG.phoneConversionLabel);
  };

  const handleWhatsAppClick = (e) => {
    trackGoogleAdsConversion(GOOGLE_ADS_CONFIG.customerId, GOOGLE_ADS_CONFIG.whatsappConversionLabel);
  };

  return (
    <div className="contact-page">
      <Helmet>
        <title>Contact Us — TheKalkaTravels | +91 88944 37637</title>
        <meta name="description" content="Contact TheKalkaTravels for taxi bookings. Call or WhatsApp +91 88944 37637. Available 24/7 for Kalka, Shimla, Manali, Delhi and all North India routes." />
        <link rel="canonical" href="https://thekalkatravels.com/contact" />
      </Helmet>
      {/* Hero */}
      <section className="contact-hero" style={{ backgroundImage: `url(${bgIMG})` }}>
        <div className="contact-hero-overlay" />
        <div className="contact-hero-content">
          <span className="section-tag" style={{ background: "rgba(249,115,22,0.2)", color: "#fdba74", border: "1px solid rgba(249,115,22,0.4)" }}>Contact</span>
          <h1>Get in Touch</h1>
          <p>We're available 24/7 to help you plan your perfect journey. Reach out via call, WhatsApp, or email.</p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="section contact-cards-section">
        <div className="container">
          <div className="contact-cards-grid">
            {CONTACT_CARDS.map((c, i) => (
              <div key={i} className="contact-card" style={{ "--card-color": c.color, "--card-bg": c.bg }}>
                <div className="contact-card-icon" style={{ background: c.bg, color: c.color }}>
                  {c.icon === "whatsapp"
                    ? <img src={whatsappIcon} alt="WhatsApp" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
                    : c.icon}
                </div>
                <div className="contact-card-body">
                  <h3>{c.title}</h3>
                  <span className="contact-card-subtitle">{c.subtitle}</span>
                  <p className="contact-card-value">{c.value}</p>
                  <a
                    href={c.action}
                    className="contact-card-btn"
                    style={{ background: c.color }}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noreferrer" : undefined}
                    onClick={c.title === "Call Us" ? handlePhoneClick : (c.title === "WhatsApp" ? handleWhatsAppClick : undefined)}
                  >
                    {c.actionLabel} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map + Info */}
      <section className="section contact-info-section">
        <div className="container">
          <div className="contact-info-grid">
            <div className="contact-info-left">
              <span className="section-tag">Business Hours</span>
              <h2 className="section-title" style={{ textAlign: "left" }}>We're Always Available</h2>
              <p style={{ color: "var(--gray-500)", marginBottom: "28px", lineHeight: "1.7" }}>
                Our team is available round the clock to assist you with bookings, queries, and travel planning.
              </p>
              <div className="hours-list">
                {[
                  { day: "Monday – Friday", time: "24 Hours" },
                  { day: "Saturday", time: "24 Hours" },
                  { day: "Sunday", time: "24 Hours" },
                  { day: "Holidays", time: "24 Hours" },
                ].map((h, i) => (
                  <div key={i} className="hours-row">
                    <span>{h.day}</span>
                    <span className="hours-badge">{h.time}</span>
                  </div>
                ))}
              </div>
              <div className="contact-quick-actions">
                <a href={`tel:${PHONE}`} className="btn btn-primary" onClick={handlePhoneClick}>📞 Call Now</a>
                <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noreferrer" className="btn btn-whatsapp" onClick={handleWhatsAppClick}>
                  <img src={whatsappIcon} alt="WhatsApp" style={{ width: "18px", height: "18px", objectFit: "contain" }} /> WhatsApp
                </a>
              </div>
            </div>
            <div className="contact-map-wrap">
              <iframe
                title="KalkaTravells Location - Chandigarh"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109744.10891624687!2d76.69809571787671!3d30.73331595681444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0be66ec96b%3A0xa5ff67f9527319fe!2sChandigarh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "16px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section contact-faq-section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "48px" }}>
            <span className="section-tag">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-desc">Quick answers to common questions about our services</p>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-question">
                  <span>{f.q}</span>
                  <span className="faq-arrow">+</span>
                </summary>
                <p className="faq-answer">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
