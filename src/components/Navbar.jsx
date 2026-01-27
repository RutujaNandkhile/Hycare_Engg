import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // hide navbar on these pages if needed
  const hideOnRoutes = ["/login", "/dashboard", "/users"];

  if (hideOnRoutes.includes(location.pathname)) {
    return null; // don't render navbar
  }

  const isLogin = localStorage.getItem("isLogin");

  return (
    <header className="navbar">
      <div className="logo">HYCARE INDUSTRIES</div>

      {/* Hamburger Button */}
      <div className="menu-btn" onClick={() => setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={open ? "active" : ""}>
        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setOpen(false)}>About Us</Link>
        <Link to="/services" onClick={() => setOpen(false)}>Services</Link>
        {/* <Link to="/pages" onClick={() => setOpen(false)}>Pages</Link> */}
        <Link to="/contact" onClick={() => setOpen(false)}>Contact Us</Link>

        {/* Application tab */}
        <Link to="/application" onClick={() => setOpen(false)}>Application</Link>

        {!isLogin && <Link to="/login" onClick={() => setOpen(false)}>Login</Link>}
      </nav>

      <div className="social">
        <i className="bi bi-facebook"></i>
        <i className="bi bi-twitter"></i>
        <i className="bi bi-youtube"></i>
      </div>
    </header>
  );
};

export default Navbar;
