import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LogoLight from "../../../public/images/Pages/Logo_light.svg";
import LogoDark from "../../../public/images/Pages/Logo_dark.svg";
import './Navbar.css';

const Navbar = ({ isLightMode, toggleLightMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
  document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
}, [isMobileMenuOpen]);

  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("home");
      if (hero) {
        const heroHeight = hero.offsetHeight;
        setScrolled(window.scrollY > heroHeight - 80); // 80 = navbar height
      } else {
        setScrolled(window.scrollY > 50);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMobileToggle = () => {
    if (isMobileMenuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setIsClosing(false);
      }, 600);
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  const handleSectionNavigation = (path) => {
    const [route, section] = path.split('#');
    if (route && route !== location.pathname) {
      window.location.href = path;
    } else if (section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const links = [
    { 
      path: "/", 
      label: "Home", 
      subsections: [
        { path: "/#goal", label: "Our Goal" },
        { path: "/#features", label: "Our Features" },
        { path: "/#collaborate", label: "Collaborate" },
        // { path: "/#podcast", label: "Our Podcasts" },
        { path: "/#faqs", label: "FAQs" }
    ]},
    { path: "/about", label: "About", subsections: [
        { path: "/about#whatisgainova", label: "What is Gainova?" },
        { path: "/about#whygainova", label: "Why Gainova?" }
      ]
    },
    { path: "/teams", label: "Teams", subsections: [
        { path: "/teams#lead", label: "Our Leads" },
        { path: "/teams#projectmanagement", label: "Project Management Team" },
        { path: "/teams#research", label: "Research Team" },
        { path: "/teams#tech", label: "Tech Team" },
        { path: "/teams#marketing", label: "Marketing Team" },
        { path: "/teams#creative", label: "Creative Team" }
      ]
    },
    // { path: "/podcast", label: "Podcast", subsections: [
    //     { path: "/podcast#purpose", label: "Purpose" },
    //     { path: "/podcast#episodes", label: "Episode:1 Mr. Speaker coming soon" }
    // ]},
    { path: "/features", label: "Features" },
    { label: "Contact Us" },
  ];

  const ToggleSwitch = ({ checked, onChange }) => {
    if (typeof onChange !== "function") {
      console.error("ToggleSwitch missing onChange prop!");
    }
    return (
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onChange()}
          aria-label="Toggle light mode"
        />
        <span className="toggle-slider"></span>
        <span className="toggle-knob"></span>
      </label>
    );
  };

  return (
    <nav className={`navbar${visible ? " navbar--visible" : ""}${scrolled ? " navbar--scrolled" : ""}`}>
      <div className="logo" style={{ cursor: "pointer" }} onClick={() => {
        if (location.pathname === '/') {
          const hero = document.getElementById("home");
          if (hero) hero.scrollIntoView({ behavior: "smooth" });
        } else {
          window.location.href = '/';
        }
      }}>
        <img
          src={isLightMode ? LogoDark : LogoLight}
          alt="Gainova Logo"
          className="logo-image"
        />
      </div>
      <ul className="nav-links desktop-nav">
        {links.map(({ path, label, subsections }) => (
          <li key={label} className={`nav-item ${subsections ? "has-dropdown" : ""}`}>
            {label === "Contact Us" ? (
              <button
                className="nav-contact-btn"
                onClick={(e) => {
  e.preventDefault();
  setIsMobileMenuOpen(false);
  setTimeout(() => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }, 100);
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
                      const sectionMap = {
                        "/": "home",
                        "/about": "about-hero",
                        "/teams": "teams-hero",
                        // "/podcast": "podcast-hero",
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
                        <button 
                          className="dropdown-link"
                          onClick={(e) => {
                            e.preventDefault();
                            handleSectionNavigation(sub.path);
                          }}
                        >
                          {sub.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </li>
        ))}
        <li>
          {/* <ToggleSwitch checked={isLightMode} onChange={toggleLightMode} /> */}
        </li>
      </ul>
      
      <div className="mobile-nav-toggle">
        {/* <ToggleSwitch checked={isLightMode} onChange={toggleLightMode} /> */}
        <button
          className="hamburger-toggle"
          onClick={handleMobileToggle}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <line x1="8" y1="8" x2="24" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="24" y1="8" x2="8" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <line x1="6" y1="9" x2="26" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="6" y1="16" x2="26" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="6" y1="23" x2="26" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>
      {isMobileMenuOpen && (
  <div className="mobile-dropdown open">
    <button className="close-btn" onClick={handleMobileToggle} aria-label="Close menu">
      &times;
    </button>
      <ul className={`mobile-dropdown${isMobileMenuOpen ? " open" : ""}${isClosing ? " closing" : ""}`}>
  {links.map(({ path, label, subsections }) => (
    <li key={label} className="mobile-nav-item">
      {label === "Contact Us" ? (
        <button
          className="nav-contact-btn"
          onClick={(e) => {
  e.preventDefault();
  setIsMobileMenuOpen(false);
  setTimeout(() => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }, 100);
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
              const sectionMap = {
                "/": "home",
                "/about": "about-hero",
                "/features": "features-hero", 
                "/teams": "teams-hero",
                // "/podcast": "podcast-hero",
              };
              const hero = sectionMap[path] && document.getElementById(sectionMap[path]);
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
  </div>
)}
    </nav>
  );
};

export default Navbar;