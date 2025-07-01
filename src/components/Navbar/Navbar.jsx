// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LogoLight from "../../assets/Logo_light.svg";
import LogoDark from "../../assets/Logo_dark.svg";
import './Navbar.css';

const Navbar = ({ isLightMode, toggleLightMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setVisible(false); // Reset animation
    const timer = setTimeout(() => setVisible(true), 100); // Re-trigger animation
    return () => clearTimeout(timer);
  }, [location.pathname]); // Run on every route change

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMobileToggle = () => {
    if (isMobileMenuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setIsClosing(false);
      }, 600); // Match the CSS transition duration
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  const links = [
    { path: "/", label: "Home", subsections: [
        { path: "/#goal", label: "Our goal" },
        { path: "/#podcast", label: "Our podcasts" },
        { path: "/#features", label: "Our features" },
        { path: "/#faqs", label: "Faqs" }
    ]},
    { path: "/about", label: "About", subsections: [
        { path: "/about#whatisgainova", label: "What is Gainova?" },
        { path: "/about#whygainova", label: "Why Gainova?" }
      ]
    },
    { path: "/teams", label: "Teams", subsections: [
        { path: "/teams#mentor", label: "Our Mentor" },
        { path: "/teams#research", label: "Research Team" },
        { path: "/teams#web-dev", label: "Web-dev Team" },
        { path: "/teams#marketing", label: "Marketing Team" }
      ]
    },
    { path: "/podcast", label: "Podcast", subsections: [
        { path: "/podcast#purpose", label: "Purpose" },
        { path: "/podcast#episodes", label: "Episode:1 Mr. Speaker coming soon" }
    ]},
    { path: "/features", label: "Features" },
    { label: "Contact Us" }, // No path!
  ];

  // Custom Toggle Switch Component
  const ToggleSwitch = ({ checked, onChange }) => {
    if (typeof onChange !== "function") {
      console.error("ToggleSwitch missing onChange prop!");
    }
    return (
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
          onChange={() => onChange()} // <-- call without event
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
            background: checked ? "#242423" : "#d4be69", // dark bg when not checked
            borderRadius: "50%",
            boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
            transition: "left 0.3s, background 0.3s",
            zIndex: 1,
          }}
        />
      </label>
    );
  };

  console.log("Navbar scrolled state:", scrolled);
  return (
    <nav className={`navbar${visible ? " navbar--visible" : ""}${scrolled ? " navbar--scrolled" : ""}`}>
      <div className="logo" style={{ cursor: "pointer" }} onClick={() => {
  const hero = document.getElementById("home");
  if (hero) hero.scrollIntoView({ behavior: "smooth" });
}}>
        <img
          src={isLightMode ? LogoDark : LogoLight}
          alt="Gainova Logo"
          className="logo-image"
        />
      </div>
      <ul className="nav-links desktop-nav">
        {links.map(({ path, label, subsections }) => (
          <li key={label} className={subsections ? "has-dropdown" : ""}>
            {label === "Contact Us" ? (
              <button
                className="nav-contact-btn"
                onClick={e => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  setTimeout(() => {
                    const footer = document.querySelector("footer.footer");
                    if (footer) {
                      footer.scrollIntoView({ behavior: "smooth" });
                    }
                  }, 100);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "inherit",
                  font: "inherit",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                {label}
              </button>
            ) : (
              <>
                <NavLink
                  to={path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setTimeout(() => {
                      // Map route to hero section id
                      const sectionMap = {
                        "/": "home",
                        "/about": "about-hero",
                        "/teams": "teams-hero",
                        "/podcast": "podcast-hero",
                        "/features": "features-hero",
                      };
                      const sectionId = sectionMap[path];
                      const hero = sectionId ? document.getElementById(sectionId) : null;
                      if (hero) {
                        hero.scrollIntoView({ behavior: "smooth" });
                      } else {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }, 100);
                  }}
                >
                  {label}
                </NavLink>
                {subsections && (
                  <ul className="dropdown">
                    {subsections.map(sub => (
                      <li key={sub.label}>
                        <NavLink to={sub.path}>{sub.label}</NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </li>
        ))}
        {/* <li>
          <ToggleSwitch checked={isLightMode} onChange={toggleLightMode} />
        </li> */}
      </ul>
      <div className="mobile-nav-toggle">
        {/* <ToggleSwitch checked={isLightMode} onChange={toggleLightMode} /> */}
        <button
          className="hamburger-toggle"
          onClick={handleMobileToggle}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <line x1="8" y1="8" x2="24" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="24" y1="8" x2="8" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg> : "☰"}
        </button>
      </div>
      <ul className={`mobile-dropdown${isMobileMenuOpen ? " open" : ""}${isClosing ? " closing" : ""}`}>
        <button
          className="close-btn"
          onClick={handleMobileToggle}
          aria-label="Close menu"
        >
          {/* SVG close icon */}
          
        </button>
        {links.map(({ path, label }) => (
          <li key={label}>
            {label === "Contact Us" ? (
              <button
                className="nav-contact-btn"
                onClick={e => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  setTimeout(() => {
                    const footer = document.querySelector("footer.footer");
                    if (footer) {
                      footer.scrollIntoView({ behavior: "smooth" });
                    }
                  }, 100);
                }}
                style={{
                  background: "none",
                  border: "none", 
                  color: "inherit",
                  font: "inherit",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                {label}
              </button>
            ) : (
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setTimeout(() => {
                    // Map route to hero section id
                    const sectionMap = {
                      "/": "home",
                      "/about": "about-hero",
                      "/teams": "teams-hero",
                      "/podcast": "podcast-hero",
                      "/features": "features-hero",
                    };
                    const sectionId = sectionMap[path];
                    const hero = sectionId ? document.getElementById(sectionId) : null;
                    if (hero) {
                      hero.scrollIntoView({ behavior: "smooth" });
                    } else {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }, 100);
                }}
              >
                {label}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;