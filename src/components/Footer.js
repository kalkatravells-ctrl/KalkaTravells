import { Link, useLocation } from "react-router-dom";

const PHONE = "918894437637";
const PHONE_DISPLAY = "+91 88944 37637";

function Footer() {
  const location = useLocation();
  if (location.pathname.startsWith("/admin/dashboard")) return null;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-section">
            <h3 className="footer-title">TheKalkaTravels</h3>
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
                💬 WhatsApp
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
            <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noreferrer" className="footer-link">💬 WhatsApp Us</a>
            <p className="footer-link">📍 Kalka, Himachal Pradesh</p>
            <a href="mailto:info@kalkatravels.com" className="footer-link">📧 info@kalkatravels.com</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} TheKalkaTravels. All Rights Reserved. | Made with ❤️ in Himachal Pradesh</p>
        </div>
      </div>

      <a
        href={`https://wa.me/${PHONE}`}
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        💬
      </a>
    </footer>
  );
}

export default Footer;
