// src/components/Navbar.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ isLightMode, toggleLightMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileToggle = () => setIsMobileMenuOpen((prev) => !prev);

  const links = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/teams", label: "Teams" },
    { path: "/podcast", label: "Podcast" },
    { path: "/features", label: "Features" },
  ];

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <span className="logo-light">G</span>
        <span className="logo-orange">AI</span>
        <span className="logo-light">NOVA</span>
      </div>

      {/* Desktop Nav */}
      <ul className="nav-links desktop-nav">
        {links.map(({ path, label }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {label}
            </NavLink>
          </li>
        ))}
        <li>
          <button
            aria-label="Toggle light mode"
            className="lightmode-toggle"
            onClick={toggleLightMode}
            style={{
              marginLeft: "1.5rem",
              fontSize: "1.2rem",
              background: "none",
              border: "none",
              color: isLightMode ? "#ff6b35" : "#f0f0f0",
              cursor: "pointer",
            }}
          >
            {isLightMode ? "☀️" : "🌙"}
          </button>
        </li>
      </ul>

      {/* Mobile: Light toggle + hamburger */}
      <div className="mobile-nav-toggle">
              <button
        onClick={toggleLightMode}
        style={{
          fontSize: "1rem",
          background: "none",
          border: "none",
          color: isLightMode ? "#213547" : "#f0f0f0", // Light vs Dark text
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        {isLightMode ? (
          <>
            ☀️
          </>
        ) : (
          <>
            🌙
          </>
        )}
      </button>

        <button
  className="hamburger-toggle"
  onClick={handleMobileToggle}
  aria-label="Toggle menu"
  style={{
    fontSize: "1.5rem",
    background: "none",
    border: "none",
    color: isLightMode ? "#213547" : "#f0f0f0", // 👈 This is the important part
    cursor: "pointer",
  }}
>
  {isMobileMenuOpen ? "✖️" : "☰"}
</button>

      </div>

      {/* Mobile dropdown */}
      {isMobileMenuOpen && (
        <ul className="mobile-dropdown">
          {links.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""} ${isLightMode ? "light-text" : "dark-text"}`
                }
              >
                {label}
              </NavLink>

            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
