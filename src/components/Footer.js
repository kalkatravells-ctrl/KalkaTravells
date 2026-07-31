import { Link, useLocation } from "react-router-dom";
import whatsappIcon from "../Assets/WhatsApp_icon.png";
import logoLB from "../Assets/LOGO-LB.png";

const PHONE = "919815948989";
const PHONE_DISPLAY = "+91 98159 48989";

function Footer() {
  const location = useLocation();
  if (location.pathname.startsWith("/admin/dashboard")) return null;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-section">
            <h3 className="footer-title">KalkaTravells</h3>
            <p style={{ color: "var(--gray-400)", marginBottom: "20px", fontSize: "14px", lineHeight: "1.7" }}>
              Your reliable partner for comfortable and safe travel across North India. Specializing in Himachal tours and outstation taxi services since 1999.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <a
                href={`https://wa.me/${PHONE}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "#22c55e",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "700",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <img src={whatsappIcon} alt="WhatsApp" style={{ width: "18px", height: "18px", objectFit: "contain" }} /> WhatsApp
              </a>
              <a
                href={`tel:${PHONE}`}
                style={{
                  background: "var(--primary)",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "700",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                📞 Call
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/services" className="footer-link">Services</Link>
            <Link to="/destinations" className="footer-link">Destinations</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <a href={`tel:${PHONE}`} className="footer-link">📞 {PHONE_DISPLAY}</a>
            <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noreferrer" className="footer-link"><img src={whatsappIcon} alt="WhatsApp" style={{ width: "16px", height: "16px", objectFit: "contain", verticalAlign: "middle", marginRight: "6px" }} />WhatsApp Us</a>
            <p className="footer-link">📍 Chandigarh, Punjab</p>
            <a href="mailto:kalkatravells@gmail.com" className="footer-link">📧 kalkatravells@gmail.com</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} KalkaTravells. All Rights Reserved.</p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px", justifyContent: "center" }}>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>Designed by</span>
            <a href="https://aryan-cv.vercel.app/" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", cursor: "pointer", textDecoration: "none", transition: "all 0.3s ease" }} onMouseEnter={(e) => e.target.style.opacity = "1"} onMouseLeave={(e) => e.target.style.opacity = "0.7"}>
              <img src={logoLB} alt="LOGO-LB" style={{ height: "28px", objectFit: "contain", opacity: 0.7 }} />
            </a>
          </div>
          <Link to="/admin" style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", marginTop: "8px", display: "inline-block", textDecoration: "none" }}>
            🔒 Admin Login
          </Link>
        </div>
      </div>

      <a
        href={`https://wa.me/${PHONE}`}
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <img src={whatsappIcon} alt="WhatsApp" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
      </a>

      <a
        href={`tel:${PHONE}`}
        className="call-float"
        aria-label="Call us now"
        title="Call Now"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "white" }}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      </a>
    </footer>
  );
}

export default Footer;
