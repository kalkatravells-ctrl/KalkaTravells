function Contact() {
  const phoneNumber = "918894437637";

  return (
    <div className="container" style={{ padding: "60px 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "36px", color: "#1e293b", marginBottom: "20px" }}>Contact Us</h1>
      <p style={{ fontSize: "18px", color: "#64748b", marginBottom: "40px" }}>
        Get in touch with TheKalkaTravels for your taxi booking and tour package needs.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px", marginTop: "40px" }}>
        <div className="admin-card" style={{ padding: "30px" }}>
          <div style={{ fontSize: "40px", marginBottom: "15px" }}>📞</div>
          <h3 style={{ marginBottom: "10px" }}>Phone</h3>
          <p style={{ fontSize: "18px", fontWeight: "600" }}>
            <a href={`tel:${phoneNumber}`} style={{ color: "#2563eb", textDecoration: "none" }}>
              +91 88944 37637
            </a>
          </p>
        </div>

        <div className="admin-card" style={{ padding: "30px" }}>
          <div style={{ fontSize: "40px", marginBottom: "15px" }}>💬</div>
          <h3 style={{ marginBottom: "10px" }}>WhatsApp</h3>
          <p style={{ fontSize: "18px", fontWeight: "600" }}>
            <a
              href={`https://wa.me/${phoneNumber}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#16a34a", textDecoration: "none" }}
            >
              Chat on WhatsApp
            </a>
          </p>
        </div>

        <div className="admin-card" style={{ padding: "30px" }}>
          <div style={{ fontSize: "40px", marginBottom: "15px" }}>📍</div>
          <h3 style={{ marginBottom: "10px" }}>Location</h3>
          <p style={{ fontSize: "18px", fontWeight: "600", color: "#334155" }}>
            Kalka, Himachal Pradesh, India
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
