import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../Assets/kalkaTravelsLogo.png";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        {/* Logo */}
        <Link to="/" onClick={() => setOpen(false)} className="logo-wrapper">
          <img src={logo} alt="Kalka Travels Logo" />
        </Link>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>

        {/* Links */}
        <div className={`nav-links ${open ? "open" : ""}`}>
          <Link to="/" className="nav-link" onClick={() => setOpen(false)}>
            Home
          </Link>

          <Link to="/about" className="nav-link" onClick={() => setOpen(false)}>
            About
          </Link>

          <Link to="/services" className="nav-link" onClick={() => setOpen(false)}>
            Services
          </Link>

          <Link
            to="/destinations"
            className="nav-link"
            onClick={() => setOpen(false)}
          >
            Destinations
          </Link>

          <Link to="/contact" className="nav-link" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
