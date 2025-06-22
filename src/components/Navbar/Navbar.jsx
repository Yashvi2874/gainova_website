// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/Logo_nobg.svg";
import './Navbar.css';

const Navbar = ({ isLightMode, setIsLightMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setVisible(false); // Reset animation
    const timer = setTimeout(() => setVisible(true), 100); // Re-trigger animation
    return () => clearTimeout(timer);
  }, [location.pathname]); // Run on every route change

  const handleMobileToggle = () => setIsMobileMenuOpen((prev) => !prev);

  const links = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/teams", label: "Teams" },
    { path: "/podcast", label: "Podcast" },
    { path: "/features", label: "Features" },
  ];

  // Custom Toggle Switch Component
  const ToggleSwitch = ({ checked, onChange }) => (
    <label
      style={{
        display: "inline-block",
        width: "44px",
        height: "24px",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label="Toggle light mode"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          opacity: 0,
          margin: 0,
          cursor: "pointer",
          zIndex: 2,
        }}
      />
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: checked ? "#d4be69" : "#333",
          borderRadius: "24px",
          transition: "background 0.3s",
          zIndex: 1,
        }}
      />
      <span
        style={{
          position: "absolute",
          top: "2px",
          left: checked ? "22px" : "2px",
          width: "20px",
          height: "20px",
          background: "#fff",
          borderRadius: "50%",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          transition: "left 0.3s",
          zIndex: 1,
        }}
      />
    </label>
  );

  const toggleLightMode = () => {
    setIsLightMode((prev) => !prev);
    console.log("Theme toggled!");
  };

  return (
    <nav className={`navbar${visible ? " navbar--visible" : ""}`}>
      <div className="logo">
        <img src={Logo} alt="Gainova Logo" className="logo-image" />
      </div>
      <ul className="nav-links desktop-nav">
        {links.map(({ path, label }) => (
          <li key={path}>
            <NavLink to={path} className={({ isActive }) => (isActive ? "active" : "")}>
              {label}
            </NavLink>
          </li>
        ))}
        <li>
          <ToggleSwitch checked={isLightMode} onChange={toggleLightMode} />
        </li>
      </ul>
      <div className="mobile-nav-toggle">
        <ToggleSwitch checked={isLightMode} onChange={toggleLightMode} />
        <button
          className="hamburger-toggle"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <line x1="8" y1="8" x2="24" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="24" y1="8" x2="8" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg> : "☰"}
        </button>
      </div>
      <ul className={`mobile-dropdown${isMobileMenuOpen ? " open" : ""}`}>
        <button
          className="close-btn"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          {/* SVG close icon */}
          
        </button>
        {links.map(({ path, label }) => (
          <li key={path}>
            <NavLink to={path} className={({ isActive }) => (isActive ? "active" : "")}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
