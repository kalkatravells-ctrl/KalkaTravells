import { Link } from "react-router-dom";

function Footer() {
  const phoneNumber = "918894437637";

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-title">TheKalkaTravels</h3>
            <p style={{ color: "var(--gray-400)", marginBottom: "20px" }}>
              Your reliable partner for comfortable and safe travel across North India. Specializing in Himachal tours and outstation taxi services.
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/services" className="footer-link">Services</Link>
            <Link to="/destinations" className="footer-link">Destinations</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <p className="footer-link">📞 +91 88944 37637</p>
            <p className="footer-link">💬 WhatsApp: +91 88944 37637</p>
            <p className="footer-link">📍 Kalka, Himachal Pradesh</p>
            <p className="footer-link">📧 info@kalkatravels.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} TheKalkaTravels. All Rights Reserved.</p>
        </div>
      </div>

      <a
        href={`https://wa.me/${phoneNumber}`}
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