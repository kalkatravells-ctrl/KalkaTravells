import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import logo from "../Assets/kalkaTravelsLogo.png";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/destinations", label: "Destinations" },
  { to: "/routes", label: "Routes" },
  { to: "/contact", label: "Contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user && user.uid === process.env.REACT_APP_ADMIN_UID);
    });
    return unsub;
  }, []);

  // Close menu on navigation
  useEffect(() => { setOpen(false); }, [location]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  if (location.pathname.startsWith("/admin/dashboard")) return null;

  return (
    <>
      <nav className="navbar" style={scrolled ? {
        background: "rgba(10, 15, 40, 0.45)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.25)"
      } : {}}>
        <div className="container">
          <Link to="/" className="logo-wrapper" aria-label="TheKalkaTravels Home">
            <img src={logo} alt="Kalka Travels Logo" />
          </Link>

          <button
            className={`hamburger${open ? " hamburger--open" : ""}`}
            onClick={() => setOpen(o => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
          </button>

          {/* Desktop nav links — inline on desktop, hidden on mobile */}
          <div className="nav-links desktop-only">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link${isActive(to) ? " active" : ""}`}
              >
                {label}
              </Link>
            ))}
            {!isAdmin && (
              <Link to="/admin" className="nav-admin-btn">🔒 Admin</Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile menu — outside navbar, no stacking context issues */}
      <div className={`mobile-menu${open ? " mobile-menu--open" : ""}`} aria-hidden={!open}>
        {NAV_LINKS.map(({ to, label }, i) => (
          <Link
            key={to}
            to={to}
            className={`mobile-nav-link${isActive(to) ? " active" : ""}`}
            style={{ "--i": i }}
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
        {!isAdmin && (
          <Link
            to="/admin"
            className="mobile-nav-link nav-admin-btn"
            style={{ "--i": NAV_LINKS.length }}
            onClick={() => setOpen(false)}
          >
            🔒 Admin
          </Link>
        )}
      </div>

      {/* Backdrop */}
      <div
        className={`nav-backdrop${open ? " nav-backdrop--open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
    </>
  );
}

export default Navbar;
