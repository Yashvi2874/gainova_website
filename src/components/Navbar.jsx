import React, { useState } from "react";

const Navbar = ({ sections, activeSection, scrollToSection, isLightMode, toggleLightMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileToggle = () => setIsMobileMenuOpen((prev) => !prev);

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
        {sections.map((section) => (
          <li key={section}>
            <button
              onClick={() => scrollToSection(section)}
              className={activeSection === section ? "active" : ""}
            >
              {section === "why"
                ? "Why GAINOVA"
                : section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
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
          aria-label="Toggle light mode"
          onClick={toggleLightMode}
          className="lightmode-toggle"
          style={{
            fontSize: "1.2rem",
            background: "none",
            border: "none",
            color: isLightMode ? "#ff6b35" : "#f0f0f0",
            cursor: "pointer",
            marginRight: "1rem",
          }}
        >
          {isLightMode ? "☀️" : "🌙"}
        </button>
        <button
          className="hamburger-toggle"
          onClick={handleMobileToggle}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? "✖️" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isMobileMenuOpen && (
        <ul className="mobile-dropdown">
          {sections.map((section) => (
            <li key={section}>
              <button
                onClick={() => {
                  scrollToSection(section);
                  setIsMobileMenuOpen(false);
                }}
                className={activeSection === section ? "active" : ""}
              >
                {section === "why"
                  ? "Why GAINOVA"
                  : section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
